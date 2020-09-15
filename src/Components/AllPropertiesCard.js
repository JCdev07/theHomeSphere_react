import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FaBed, FaCarAlt, FaBath } from "react-icons/fa";
import styled from "styled-components";

const Make3dSpace = styled.div`
   position: relative;
   perspective: 800px;
   width: 340px;
   height: 300px;
   transform-style: preserve-3d;
   transition: transform 5s;
   position: relative;
   top: 80px;
   left: 50%;
   margin-left: -167px;
   margin-bottom: 20px;
`;

const ProductCard = styled.div`
   width: 325px;
   height: 100%;
   position: absolute;
   top: 10px;
   left: 10px;
   overflow: hidden;
   transform-style: preserve-3d;
   -webkit-transition: 100ms ease-out;
   -moz-transition: 100ms ease-out;
   -o-transition: 100ms ease-out;
   transition: 100ms ease-out;

   border: 1px solid #d8d8d8;
   border-radius: 2px;

   overflow: hidden;

   &.animate {
      top: 15px;
      left: 5px;
      width: 335px;
      height: 310px;
      box-shadow: 0px 13px 21px -5px rgba(0, 0, 0, 0.3);
      -webkit-transition: 100ms ease-out;
      -moz-transition: 100ms ease-out;
      -o-transition: 100ms ease-out;
      transition: 100ms ease-out;

      & .stats-container {
         top: 145px;
         -webkit-transition: all 200ms ease-out;
         -moz-transition: all 200ms ease-out;
         -o-transition: all 200ms ease-out;
         transition: all 200ms ease-out;
      }

      .image_overlay {
         opacity: 0.7;
         -webkit-transition: all 200ms ease-out;
         -moz-transition: all 200ms ease-out;
         -o-transition: all 200ms ease-out;
         transition: all 200ms ease-out;
      }

      & .view_details {
         opacity: 1;
         width: 152px;
         font-size: 15px;
         margin-left: -75px;
         top: 60px;
         -webkit-transition: all 200ms ease-out;
         -moz-transition: all 200ms ease-out;
         -o-transition: all 200ms ease-out;
         transition: all 200ms ease-out;
      }
   }

   & .stats-container {
      background: #fff;
      position: absolute;
      top: 190px;
      left: 0;
      width: 100%;
      height: 165px;
      padding: 17px 20px 20px;
      -webkit-transition: all 200ms ease-out;
      -moz-transition: all 200ms ease-out;
      -o-transition: all 200ms ease-out;
      transition: all 200ms ease-out;

      & .product_name {
         font-size: 22px;
         color: #393c45;
      }

      & p {
         font-size: 16px;
         color: #b1b1b3;
         padding: 2px 0 20px 0;
      }

      & .product_price {
         float: right;
         color: #330066;
         font-size: 15px;
         font-weight: 600;
      }
   }

   & .image_overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
         rgba(82, 45, 128, 0.4),
         rgba(82, 45, 128, 0.8)
      );
      opacity: 0;
   }
   & .product-options {
      padding: 2px 0 0;

      & svg {
         fill: #393c45;
         color: #393c45;
      }

      & strong {
         font-weight: 700;
         color: #393c45;
         font-size: 14px;
      }

      & span {
         color: #969699;
         font-size: 14px;
         display: block;
         margin-bottom: 8px;
      }
   }

   & .shadow {
      width: 335px;
      height: 520px;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      display: none;
      background: -webkit-linear-gradient(
         left,
         rgba(0, 0, 0, 0.1),
         rgba(0, 0, 0, 0.2)
      );
      background: -o-linear-gradient(
         right,
         rgba(0, 0, 0, 0.1),
         rgba(0, 0, 0, 0.2)
      );
      background: -moz-linear-gradient(
         right,
         rgba(0, 0, 0, 0.1),
         rgba(0, 0, 0, 0.2)
      );
      background: linear-gradient(
         to right,
         rgba(0, 0, 0, 0.1),
         rgba(0, 0, 0, 0.2)
      );
   }
`;

const ViewDetails = styled.div`
   position: absolute;
   top: 112px;
   left: 50%;
   margin-left: -85px;
   border: 2px solid #fff;
   color: #fff;
   font-size: 19px;
   text-align: center;
   text-transform: uppercase;
   font-weight: 700;
   padding: 10px 0;
   width: 172px;
   opacity: 0;
   -webkit-transition: all 200ms ease-out;
   -moz-transition: all 200ms ease-out;
   -o-transition: all 200ms ease-out;
   transition: all 200ms ease-out;

   &:hover {
      background: #fff;
      color: #7851a9;
      cursor: pointer;
   }
`;

const AllPropertiesCard = ({ property }) => {
   const [hovered, setHovered] = useState(false);
   const [isLinkClicked, setIsLinkClicked] = useState(false);

   const toggleHover = () => setHovered(!hovered);

   if (isLinkClicked) {
      return <Redirect to={`/properties/${property._id}`} />;
   }
   return (
      <div className="col-12 col-md-6 col-lg-4">
         <Make3dSpace id="make-3D-space">
            <ProductCard
               id="product-card"
               className={hovered ? "animate" : ""}
               onMouseEnter={toggleHover}
               onMouseLeave={toggleHover}
            >
               <div id="product-front">
                  <div className="shadow" />
                  <img
                     src={`https://thehomesphereapi.herokuapp.com/${property.coverImage}`}
                     alt=""
                  />
                  <div className="image_overlay" />
                  <ViewDetails
                     id="view_details"
                     className="view_details"
                     onClick={() => setIsLinkClicked(true)}
                  >
                     View details
                  </ViewDetails>
                  <div className="stats">
                     <div className="stats-container">
                        <span className="product_price">
                           &#8369;{property.price}.00 / Night
                        </span>
                        <span className="product_name">{property.name}</span>
                        <p>
                           {property.address
                              ? property.address
                              : "Property Address"}
                        </p>

                        <div className="product-options d-flex justify-content-between align-items-center">
                           <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                              <FaBed />
                              <span>{property.details.bedroom}</span>
                           </div>
                           <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                              <FaBath />
                              <span>{property.details.bathroom}</span>
                           </div>
                           <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                              <FaCarAlt />
                              <span>{property.details.carSlot}</span>
                           </div>
                           <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                              <span className="m-0 p-0">Floor</span>
                              <span>{property.details.landArea}&#13217;</span>
                           </div>
                           <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                              <span className="m-0 p-0">Land</span>
                              <span>FloorCap&#13217;</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </ProductCard>
         </Make3dSpace>
      </div>
   );
};

export default AllPropertiesCard;
