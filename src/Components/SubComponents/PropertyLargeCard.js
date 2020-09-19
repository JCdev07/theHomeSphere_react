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

   &::before {
      content: "";
      height: 100%;
      width: 100%;
      z-index: 1000;
      display: block;
      background-color: blue;
      position: absolute;
      background-color: rgb(51, 0, 102, 0.1);
      transition: all 0.3s ease;
   }

   &:hover::before {
      background-color: rgb(51, 0, 102, 0.35);
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
   z-index: 2000;

   &::before {
      content: "";
      height: 100%;
      width: 100%;
      background-color: #330066;
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
         className="col-12 col-md-6 col-lg-8 mt-5 px-3"
         onClick={() => setOnClick(true)}
      >
         <Card className="card">
            <img
               src={property.coverImage}
               // onError="src='https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'"
               className="card-img-top img-fluid"
               alt={property.name}
            />
            <CardBody className="card-body p-2">
               <h5 className="card-title m-0">{property.name}</h5>
               <small className="m-0">{property.address}</small>
            </CardBody>
         </Card>
      </FeaturedContainer>
   );
};

export default PropertyCard;
