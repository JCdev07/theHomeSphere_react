import React from "react";
import styled from "styled-components";
import Badge from "./Badge";

const ModalToggle = styled.div`
   display: inline-block;
   overflow: auto;
   background: white;
   margin: 10px;
   padding: 10px;
   cursor: pointer;
   color: lightsteelblue;
   border-radius: 7px;
   box-shadow: 2px 5px 1rem rgba(0, 0, 0, 0.2);
   width: 100%;
`;

const ModalToggler = ({ badgeText, badgeType, openModal }) => {
   return (
      <>
         <div className="col-6">
            <ModalToggle id="model" onClick={openModal}>
               <Badge text={badgeText} type={badgeType} />
               <h5 className="mt-2 mb-0">Property Name</h5>
               <h6 className=" mb-0">Address</h6>
            </ModalToggle>
         </div>
      </>
   );
};

export default ModalToggler;
