import React from "react";
import { useToasts } from "react-toast-notifications";

const ToastNotification = () => {
   const { addToast } = useToasts();
   return (
      <button
         onClick={() =>
            addToast("New Notiff", {
               appearance: "success",
               autoDismiss: true,
               autoDismissTimeout: 10000,
            })
         }
      >
         Add Toast
      </button>
   );
};

export default ToastNotification;
