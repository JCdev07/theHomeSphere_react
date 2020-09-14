import React from "react";
import styled from "styled-components";

const Heading = styled.h2`
   padding: 4px 0;
   text-align: center;
   position: relative;
   display: inline-block;

   &::before {
      width: 35%;
      height: 3px;
      background-color: steelblue;
      content: "";
      position: absolute;
      top: -1%;
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
