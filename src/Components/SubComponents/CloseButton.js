import React from "react";
import styled from "styled-components";

const CloseBtn = styled.span`
   font-size: 1.6rem;
   cursor: pointer;
   padding: 0.5rem;
   border-radius: 50%;
`;

const CloseButton = ({ onClick }) => {
   return (
      <>
         <CloseBtn onClick={onClick}>
            <svg
               width="1em"
               height="1em"
               viewBox="0 0 16 16"
               className="bi bi-arrow-left"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
               />
            </svg>
         </CloseBtn>
      </>
   );
};

export default CloseButton;
