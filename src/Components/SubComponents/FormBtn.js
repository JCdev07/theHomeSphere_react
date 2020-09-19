import React from "react";
import styled from "styled-components";

const BtnWithSpinner = styled.button`
   background-color: #ae87d0;
   color: #fff;
   border: 2px solid #7851a9;
   width: 100%;
   margin-top: 1em;
   padding: 8px 0px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   margin-bottom: 0.25em;
   transition: all 0.3s ease;
   position: relative;

   &:focus {
      border: 2px solid transparent;
   }

   &[disabled] {
      color: #fff;
   }
`;

const FormBtn = ({ isLoading, formValid, className, text }) => {
   let defText = "Submit";
   if (text) {
      defText = text;
   }

   return (
      <>
         <BtnWithSpinner
            type="submit"
            id="form-btn"
            disabled={!formValid || isLoading}
            className={className}
         >
            {isLoading ? (
               <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
               ></span>
            ) : (
               defText
            )}
         </BtnWithSpinner>
      </>
   );
};

export default FormBtn;
