import React, { useState, useEffect } from "react";
import { Wrapper, FormWrapper, Form, FormHeader } from "./RegisterFormStyle";
import InputGroup from "./SubComponents/InputGroup";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useRedirect from "./../hooks/isRedirect";
import FormBtn from "./SubComponents/FormBtn";
import { useToasts } from "react-toast-notifications";

export default function RegisterForm() {
   const { addToast } = useToasts();

   // Registration State
   const [registerStatus, setRegisterStatus] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const [errMsg, setErrMsg] = useState({
      firstnameErr: "",
      lastnameErr: "",
      emailErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
   });

   const [formValid, setFormValid] = useState(false);

   // Redirect State
   const [isRedirect, setisRedirect] = useRedirect(false);

   // isLoading State
   const [isLoading, setIsLoading] = useState(false);

   // Assigning Variables and Destructuring
   let { firstname, lastname, email, password } = registerStatus;
   let {
      firstnameErr,
      lastnameErr,
      emailErr,
      passwordErr,
      confirmPasswordErr,
   } = errMsg;

   useEffect(() => {
      if (
         firstname.length !== 0 &&
         lastname.length !== 0 &&
         email.length !== 0 &&
         password.length !== 0 &&
         firstnameErr.length === 0 &&
         lastnameErr.length === 0 &&
         emailErr.length === 0 &&
         passwordErr.length === 0 &&
         confirmPasswordErr.length === 0
      ) {
         setFormValid(true);
      }

      return function cleanup() {
         setFormValid(false);
      };
   }, [registerStatus]);

   // Form Validation On Field Value Change
   const handleChange = (e) => {
      setRegisterStatus({
         ...registerStatus,
         [e.target.name]: e.target.value,
      });

      // Destructuring event.target
      const { value, name } = e.target;

      // email regex
      const emailRegex = RegExp(
         /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      );

      switch (name) {
         case "firstname":
            setErrMsg({
               ...errMsg,
               firstnameErr: value.length > 1 ? "" : "invalid firstname",
            });
            break;
         case "lastname":
            setErrMsg({
               ...errMsg,
               lastnameErr: value.length > 1 ? "" : "invalid lastname",
            });
            break;
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
               confirmPasswordErr:
                  value !== password ? "password do not match" : "",
            });
            break;
         case "confirmPassword":
            setErrMsg({
               ...errMsg,
               confirmPasswordErr:
                  value !== password ? "password do not match" : "",
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
         // Database Query
         fetch("https://thehomesphereapi.herokuapp.com/register", {
            method: "POST",
            body: JSON.stringify({ firstname, lastname, email, password }),
            headers: {
               "Content-type": "application/json",
            },
         })
            .then((response) => {
               if (response.status !== 400) {
                  setisRedirect(true);
                  console.log(response);
               } else {
                  setIsLoading(false);
                  console.log(response);
               }
               return response.json();
            })
            .then((data) => {
               console.log(data);
               if (data.user) {
                  setIsLoading(false);
                  setisRedirect(true);
                  addToast("Successfully Created an Accout, Please Log in", {
                     appearance: "success",
                     autoDismiss: true,
                     autoDismissTimeout: 7000,
                     placement: "top-center",
                  });
               }
            });
      } else {
         alert("form not valid");
         setIsLoading(false);
      }
   };

   // Redirect
   if (isRedirect) {
      return <Redirect to="/login" />;
   }

   return (
      <>
         <Wrapper>
            <div className="row">
               <FormWrapper>
                  <FormHeader>Create Account</FormHeader>
                  <Form noValidate onSubmit={handleSubmit}>
                     {/* Firstname */}
                     <InputGroup
                        label="Firstname:"
                        className="firstname"
                        name="firstname"
                        type="text"
                        placeholder="Firstname"
                        handleChange={handleChange}
                        formError={errMsg.firstnameErr}
                     />

                     {/* Lastname */}
                     <InputGroup
                        label="Lastname:"
                        className="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Lastname"
                        handleChange={handleChange}
                        formError={errMsg.lastnameErr}
                     />

                     {/* Email */}
                     <InputGroup
                        label="Email:"
                        className="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        handleChange={handleChange}
                        formError={errMsg.emailErr}
                     />

                     {/* Password */}
                     <InputGroup
                        label="Password:"
                        className="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        handleChange={handleChange}
                        formError={errMsg.passwordErr}
                     />

                     {/* Confirm Password */}
                     <InputGroup
                        label="Confirm Password:"
                        className="password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        handleChange={handleChange}
                        formError={errMsg.confirmPasswordErr}
                     />

                     {/* CTA */}
                     <div className="createAccount">
                        <FormBtn isLoading={isLoading} />
                        <small>
                           Already Have an Accont?{" "}
                           <Link to="/login">Log in</Link>
                        </small>
                     </div>
                  </Form>
               </FormWrapper>
            </div>
         </Wrapper>
      </>
   );
}
