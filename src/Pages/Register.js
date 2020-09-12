import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Register = () => {
   const [userRegistration, setUserRegistration] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
   });

   const [response, setResponse] = useState({
      hasError: false,
      color: "",
      message: "",
   });

   const [isRedirect, setisRedirect] = useState(true);

   const handleChange = (e) => {
      setUserRegistration({
         ...userRegistration,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      fetch("https://thehomesphereapi.herokuapp.com/register", {
         method: "POST",
         body: JSON.stringify(userRegistration),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((response) => {
            if (response.status === 400) {
               setResponse({
                  ...response,
                  hasError: true,
                  color: "danger",
                  message: "Check Credentials",
               });
            } else {
               setisRedirect(true);
               setResponse({
                  ...response,
                  hasError: false,
                  color: "success",
                  message: "Please Login to Continue",
               });
            }
            return response.json();
         })
         .then((data) => {
            if (isRedirect) {
               console.log(data, data.user, isRedirect);
               // return ;
            }
         });
   };

   if (isRedirect) {
      return <Redirect to="/login" />;
   }
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">firstname:</label>
            <input
               type="text"
               name="firstname"
               id="firstname"
               onChange={handleChange}
            />
            <label htmlFor="lastname">lastname:</label>
            <input
               type="text"
               name="lastname"
               id="lastname"
               onChange={handleChange}
            />
            <label htmlFor="email">email:</label>
            <input
               type="text"
               name="email"
               id="email"
               onChange={handleChange}
            />
            <label htmlFor="password">password:</label>
            <input
               type="text"
               name="password"
               id="password"
               onChange={handleChange}
            />
            <button type="submit" className="btn btn-success">
               register
            </button>
         </form>
      </div>
   );
};

export default Register;
