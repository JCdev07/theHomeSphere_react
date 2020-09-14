import React from "react";
import HeroImgSlider from "./HeroImgSlider";

import styled from "styled-components";

const HeroRow = styled.div`
   height: 70vh;
`;

const Hero = ({ properties }) => {
   return (
      <>
         <HeroRow className="row px-3 px-lg-5">
            <div className="col-12 col-md-6 col-lg-4">
               <small>The Home Sphere is</small>
               <h1>The Rental Hub For Houses</h1>
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Esse, vel.
               </p>
            </div>
            <div className="col-12 col-md-6 col-lg-8">
               <HeroImgSlider properties={properties} />
            </div>
         </HeroRow>
      </>
   );
};

export default Hero;
