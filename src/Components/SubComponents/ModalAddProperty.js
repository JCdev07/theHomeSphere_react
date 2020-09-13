import React from "react";
import styled from "styled-components";
const ModalToggle = styled.div`
   overflow: auto;
   background: white;
   margin: 10px;
   padding: 15px;
   cursor: pointer;
   color: lightsteelblue;
   border-radius: 7px;
   box-shadow: 2px 5px 1rem rgba(0, 0, 0, 0.2);

   & h5 {
      display: flex;
      align-items: center;
      justify-content: space-around;
   }

   & span {
      font-size: 2rem;
   }
`;

const ModalToggler = ({ badgeText, badgeType, openModal }) => {
   return (
      <>
         <div className="col-6 mx-auto">
            <ModalToggle id="model" onClick={openModal}>
               <h5>
                  Add Property <span>+</span>
               </h5>
            </ModalToggle>
         </div>
      </>
   );
};

export default ModalToggler;
