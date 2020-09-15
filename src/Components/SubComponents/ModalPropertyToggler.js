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
   box-shadow: 2px 2px 1rem rgba(0, 0, 0, 0.1);
   width: 100%;
   transition: all 0.3s ease;

   &:hover {
      box-shadow: 2px 5px 1rem rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
   }
`;

const ModalToggler = ({ openModal, property }) => {
   console.log(property);
   return (
      <>
         <div className="col-6">
            <ModalToggle id="model" onClick={openModal}>
               <Badge
                  text={property.isRented ? "Not Available" : "Available"}
                  type={property.isRented ? "danger" : "primary"}
               />
               {/* <h5 className="mt-2 mb-0">{property.name}</h5> */}
               <h5 className="mb-0 d-flex justify-content-between mt-2">
                  {property.name} <small>{property.category.name}</small>
               </h5>
            </ModalToggle>
         </div>
      </>
   );
};

export default ModalToggler;
