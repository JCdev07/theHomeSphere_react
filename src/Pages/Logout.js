import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AppContext } from "../context/AppProvider";
import cogoToast from "cogo-toast";

const Logout = () => {
   const [user, setUser] = useContext(AppContext);

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
      cogoToast.info("Logged out Successfully.");
   }, []);

   if (isRedirect) {
      return <Redirect to="/" />;
   }

   return <div>Logging Out....</div>;
};

export default Logout;
