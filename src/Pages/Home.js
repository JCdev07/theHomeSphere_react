import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import ToastNotification from "./../components/ToastNotification";
import { ToastProvider } from "react-toast-notifications";

const Home = () => {
   const { value, setValue } = useContext(UserContext);

   return (
      <div>
         <h1>Home</h1>
         <h1>{value}</h1>

         <ToastProvider>
            <ToastNotification />
         </ToastProvider>
         <button
            onClick={() => {
               setValue("new msg");
            }}
         >
            button
         </button>
      </div>
   );
};

export default Home;
