import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../context/UserContext";

const Logout = () => {
   const { setUser } = useContext(UserContext);

   const { addToast } = useToasts();

   const [isRedirect, setisRedirect] = useState(false);

   useEffect(() => {
      localStorage.removeItem("userToken");
      setUser({
         isAuth: false,
         id: "",
         firstname: "",
         lastname: "",
         email: "",
         isAdmin: false,
      });
      setisRedirect(true);
      addToast("Logged Out successfully", {
         appearance: "info",
         autoDismiss: true,
         autoDismissTimeout: 7000,
         placement: "top-center",
      });
   }, []);

   if (isRedirect) {
      return <Redirect to="/" />;
   }

   return <div>Logging Out....</div>;
};

export default Logout;
