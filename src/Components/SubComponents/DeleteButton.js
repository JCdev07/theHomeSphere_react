import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const DeleteBtn = styled.button`
   font-size: 1rem;
   cursor: pointer;
   padding: 0.2rem 0.5rem;
   border-radius: 120px;
   padding: 0 1rem;
   outline: none;
   border: 1px solid #dbaf00;
   color: #dbaf00;
   background: #fff0b3;
   box-shadow: 2px 2px 1rem rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;
   outline: none;

   &:hover {
      box-shadow: 2px 5px 1rem rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
   }

   &:focus {
      outline: none;
   }
`;

const DeleteButton = ({ handleClick }) => {
   return (
      <DeleteBtn
         onClick={handleClick}
         className="d-flex justify-content-between align-items-center"
      >
         <span>Delete</span>
         <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-trash ml-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
               fillRule="evenodd"
               d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
         </svg>
      </DeleteBtn>
   );
};

export default DeleteButton;
