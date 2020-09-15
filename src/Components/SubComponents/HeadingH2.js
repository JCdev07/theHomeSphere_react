import React from "react";
import styled from "styled-components";

const Heading = styled.h2`
   padding: 4px 0;
   text-align: center;
   position: relative;
   display: inline-block;
   font-size: 1.3rem;

   &::before {
      width: 35%;
      height: 3px;
      background-color: #330066;
      content: "";
      position: absolute;
      bottom: -2%;
      left: 0%;
      /* transform: translateX(-50%); */
   }
`;

function HeadingH2({ text }) {
   return (
      <>
         <Heading>{text}</Heading>
      </>
   );
}

export default HeadingH2;
