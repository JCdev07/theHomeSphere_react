import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const EditBtn = styled.button`
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

const EditButton = ({ handleClick }) => {
   return (
      <EditBtn
         onClick={handleClick}
         className="d-flex justify-content-between align-items-center"
      >
         <span>Edit</span>
         <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-pencil-square ml-1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
               fillRule="evenodd"
               d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
         </svg>
      </EditBtn>
   );
};

export default EditButton;
