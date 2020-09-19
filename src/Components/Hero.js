import React from "react";
import HeroImgSlider from "./HeroImgSlider";
import styled from "styled-components";

const HeroRow = styled.div`
   height: 70vh;
   position: relative;
`;

const Hero = ({ properties }) => {
   return (
      <>
         <HeroRow className="row px-3">
            <div className="col-12 col-md-6 col-lg-3 pt-5">
               <small>The Home Sphere is</small>
               <h1>The Rental Hub For Houses</h1>
               <p>
                  <i>The Better Way to Rent Real Estate.</i>
               </p>
            </div>
            <div className="col-12 col-md-6 col-lg-9">
               <HeroImgSlider properties={properties} />
            </div>
         </HeroRow>
      </>
   );
};

export default Hero;
