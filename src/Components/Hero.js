import React from "react";
import HeroImgSlider from "./HeroImgSlider";
import styled from "styled-components";
import DatePicker from "./DatePicker";

const HeroRow = styled.div`
   height: 70vh;
   position: relative;
`;

const DatePickerCont = styled.div`
   width: 100%;
   height: 60px;
   position: absolute;
   z-index: 1000;
   bottom: 0;
   left: 0;
   background-color: #fff;
   padding: 5px 10px;
   border-radius: 2px;

   & .react-google-flight-datepicker .date-picker-input {
      height: 75%;
   }

   & .react-google-flight-datepicker {
      width: 80%;
   }
`;

const BtnWithSpinner = styled.button`
   background-color: #519e8a;
   color: #fff;
   border: 2px solid #519e8a;
   padding: 8px 0px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   transition: all 0.3s ease;
   position: relative;
   height: 90%;
   width: 10%;
   border-radius: 4px;

   &:focus {
      border: 2px solid transparent;
   }

   &[disabled] {
      color: #fff;
   }
`;

const Hero = ({ properties }) => {
   return (
      <>
         <HeroRow className="row px-3">
            <div className="col-12 col-md-6 col-lg-3 pt-5">
               <small>The Home Sphere is</small>
               <h1>The Rental Hub For Houses</h1>
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Esse, vel.
               </p>
            </div>
            <div className="col-12 col-md-6 col-lg-9">
               <HeroImgSlider properties={properties} />
            </div>
            <DatePickerCont className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
               <DatePicker />
               <BtnWithSpinner className="d-inline-block">
                  Book Now
               </BtnWithSpinner>
            </DatePickerCont>
         </HeroRow>
      </>
   );
};

export default Hero;
