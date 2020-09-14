import React, { useState } from "react";
import styled from "styled-components";
import PropertyCard from "./SubComponents/PropertyCard";
import PropertyLargeCard from "./SubComponents/PropertyLargeCard";
import HeadingH2 from "../components/SubComponents/HeadingH2";
import { Redirect, Link } from "react-router-dom";

const Card = styled.div`
   cursor: pointer;
   position: relative;
   height: 250px;
   width: 100%;
   transition: all 0.3s ease;
   overflow: hidden;
   border-radius: 4px;

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

const FeaturedCont = styled.div`
   padding: 1rem 4rem;
`;

function FeaturedProperties({ properties }) {
   // const [isClicked, setIsClicked] = useState({ status: false, property: {} });

   // const handleClick = (propertyClicked) => {
   //    setIsClicked({ status: true, property: propertyClicked });
   // };

   // if (isClicked.status) {
   //    setIsClicked({ ...isClicked, status: false });
   //    return <Redirect to={`/properties/${isClicked.property._id}`} />;
   // }

   const FeaturedList = properties.map((property) => {
      if (
         properties[4]._id === property._id ||
         properties[5]._id === property._id
      ) {
         return <PropertyLargeCard property={property} />;
      }
      return <PropertyCard property={property} />;
   });

   return (
      <div className="container">
         <FeaturedCont className="row mt-3 px-3 px-lg-5 mt-5">
            <div className="col-12 mx-auto text-center mt-5">
               <HeadingH2 text="Featured Properties" />
            </div>
            {FeaturedList}
         </FeaturedCont>
      </div>
   );
}

export default FeaturedProperties;
