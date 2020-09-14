import React from "react";
import styled from "styled-components";
import PropertyCard from "./SubComponents/PropertyCard";
import HeadingH2 from "../components/SubComponents/HeadingH2";

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
const FeaturedContainer = styled.div`
   border-radius: 6px;
`;

function FeaturedProperties({ properties }) {
   return (
      <div className="row mt-3 px-3 px-lg-5 mt-5">
         <div className="col-12 mx-auto text-center mt-5">
            <HeadingH2 text="Featured Properties" />
         </div>
         {properties.map((property) => {
            if (
               properties[4].id === property.id ||
               properties[5].id === property.id
            ) {
               return (
                  <FeaturedContainer
                     key={property.id}
                     className="col-12 col-md-6 col-lg-8 mt-5"
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
            }
            return <PropertyCard property={property} />;
         })}
      </div>
   );
}

export default FeaturedProperties;
