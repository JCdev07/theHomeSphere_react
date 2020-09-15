import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const Card = styled.div`
   cursor: pointer;
   position: relative;
   height: 250px;
   width: 100%;
   transition: all 0.3s ease;
   border-radius: 4px;
   overflow: hidden;
   border: 1px solid #d8d8d8;

   & img {
      width: auto;
      height: 100%;
      object-fit: cover;
      border-radius: 0;
   }

   &:hover {
      box-shadow: 2px 0.6rem 0.4rem rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);

      & div {
         transform: translateX(3%);

         & h5,
         small {
            padding-left: 30px;
         }
      }

      & div::before {
         left: -95%;
      }
   }
`;

const CardBody = styled.div`
   bottom: 0;
   position: absolute;
   background-color: #fff;
   width: 100%;
   transition: all 0.3s ease;

   &::before {
      content: "";
      height: 100%;
      width: 100%;
      background-color: steelblue;
      display: block;
      position: absolute;
      top: 0;
      left: -99%;
      transition: all 0.3s ease;
   }

   & h5,
   small {
      transition: all 0.3s ease;
   }

   @media (min-width: 768px) {
      width: 60%;
   }
`;

const FeaturedContainer = styled.div`
   border-radius: 6px;
`;
const PropertyCard = ({ property }) => {
   const [onClick, setOnClick] = useState(false);

   if (onClick) {
      return <Redirect to={`/properties/${property._id}`} />;
   }

   return (
      <FeaturedContainer
         key={property.id}
         className="col-12 col-md-6 col-lg-4 mt-5 px-3"
         onClick={() => setOnClick(true)}
      >
         <Card className="card">
            <img
               src={`https://thehomesphereapi.herokuapp.com/${property.coverImage}`}
               className="card-img-top img-fluid"
               alt="..."
            />
            <CardBody className="card-body p-2">
               <h5 className="card-title m-0">__Card title__</h5>
               <small className="m-0">__Card title__</small>
            </CardBody>
         </Card>
      </FeaturedContainer>
   );
};

export default PropertyCard;
