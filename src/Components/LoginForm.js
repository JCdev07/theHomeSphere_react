import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Wrapper, FormWrapper, Form, FormHeader } from "./RegisterFormStyle";
import InputGroup from "./SubComponents/InputGroup";
import { Redirect } from "react-router-dom";
import BtnWithSpinner from "./SubComponents/FormBtn";
import { AppContext } from "../context/AppProvider";
import cogoToast from "cogo-toast";

export default function RegisterForm() {
   const [user, setUser] = useContext(AppContext);

   // Registration State
   const [loginStatus, setLoginStatus] = useState({
      email: "",
      password: "",
   });

   const [errMsg, setErrMsg] = useState({
      emailErr: "",
      passwordErr: "",
   });

   const [formValid, setFormValid] = useState(false);

   // Redirect State
   const [isRedirect, setisRedirect] = useState(false);

   // isLoading State
   const [isLoading, setIsLoading] = useState(false);

   // Destructuring
   let { email, password } = loginStatus;
   let { emailErr, passwordErr } = errMsg;

   // Form Validation
   useEffect(() => {
      if (
         email.length !== 0 &&
         password.length !== 0 &&
         emailErr.length === 0 &&
         passwordErr.length === 0
      ) {
         setFormValid(true);
      }

      return function cleanup() {
         setFormValid(false);
      };
   }, [loginStatus]);

   // Form Validation On Field Value Change
   const handleChange = (e) => {
      setLoginStatus({
         ...loginStatus,
         [e.target.name]: e.target.value,
      });

      // Destructuring event.target
      const { value, name } = e.target;

      // email regex
      const emailRegex = RegExp(
         /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      );

      switch (name) {
         case "email":
            setErrMsg({
               ...errMsg,
               emailErr: emailRegex.test(value) ? "" : "invalid email address",
            });
            break;
         case "password":
            setErrMsg({
               ...errMsg,
               passwordErr:
                  value.length > 7
                     ? ""
                     : "password must be atleast 8 characters",
            });
            break;

         default:
            break;
      }
   };

   // On Form Submit Function
   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);

      if (formValid) {
         fetch("https://thehomesphereapi.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(loginStatus),
            headers: {
               "Content-type": "application/json",
            },
         })
            .then((response) => {
               if (response.status !== 400) {
                  cogoToast.success("Successfully Logged In");
               } else {
                  cogoToast.error("Error! Please Check Credentials");
                  setIsLoading(false);
               }
               return response.json();
            })
            .then((data) => {
               if (data.token) {
                  localStorage["userToken"] = data.token;
                  setUser({
                     isAuth: true,
                     id: data.user._id,
                     firstname: data.user.firstname,
                     lastname: data.user.lastname,
                     email: data.user.email,
                     isAdmin: data.user.isAdmin,
                  });

                  setIsLoading(false);
                  setisRedirect(true);
               }
            });
      } else {
         setIsLoading(false);
         cogoToast.error("Email or Password Incorrect");
      }
   };

   // Redirect;
   if (isRedirect) {
      return <Redirect to="/" />;
   }

   return (
      <>
         <Wrapper>
            <div className="row">
               <FormWrapper>
                  <div id="my-signin2"></div>
                  <FormHeader>Log in to your account</FormHeader>
                  <Form noValidate onSubmit={handleSubmit}>
                     {/* Email */}
                     <InputGroup
                        className="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        handleChange={handleChange}
                        formError={emailErr}
                     />

                     {/* Password */}
                     <InputGroup
                        className="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        handleChange={handleChange}
                        formError={passwordErr}
                     />

                     {/* CTA */}
                     <div className="createAccount">
                        <BtnWithSpinner
                           isLoading={isLoading}
                           formValid={formValid}
                        />
                        <small>
                           Dont have an account?{" "}
                           <Link to="/register">Sign up</Link>
                        </small>
                     </div>
                  </Form>
               </FormWrapper>
            </div>
         </Wrapper>
      </>
   );
}
