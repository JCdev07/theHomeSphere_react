import React from "react";
import styled from "styled-components";

const BtnWithSpinner = styled.button`
   background-color: #519e8a;
   color: #fff;
   border: 2px solid #519e8a;
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

const FormBtn = ({ isLoading, formValid }) => {
   return (
      <>
         <BtnWithSpinner
            type="submit"
            id="form-btn"
            disabled={!formValid || isLoading}
         >
            {isLoading ? (
               <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
               ></span>
            ) : (
               "Submit"
            )}
         </BtnWithSpinner>
      </>
   );
};

export default FormBtn;