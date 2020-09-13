import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const LinkToSingle = styled.span`
   font-size: 1.6rem;
   cursor: pointer;
   padding: 0.5rem;
   border-radius: 50%;
   transition: all 0.3s ease;

   &:hover {
      transform: scale(1.05);
   }
`;

const LinkToSingleProp = ({ link }) => {
   const [isClicked, setIsClicked] = useState(false);

   const handleClick = () => {
      setIsClicked(true);
   };

   if (isClicked) {
      return <Redirect to={link} />;
   }

   return (
      <LinkToSingle onClick={handleClick}>
         <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-box-arrow-up-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            />
            <path
               fillRule="evenodd"
               d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            />
         </svg>
      </LinkToSingle>
   );
};

export default LinkToSingleProp;
