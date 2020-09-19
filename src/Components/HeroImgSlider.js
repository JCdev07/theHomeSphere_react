import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import styled from "styled-components";

const ImgSlider = styled(animated.div)`
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   background-size: cover;
   background-position: center;
   will-change: opacity;

   &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      padding: 0;
      height: 100%;
      width: 100%;
      z-index: 2300;
      display: block;
      background-color: rgba(0, 0, 0, 0.2);
   }
`;

// @ sliderImages === array of object with images

const HeroImgSlider = ({ properties }) => {
   const images = [
      "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/681390/pexels-photo-681390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/261229/pexels-photo-261229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
   ];

   const [imgIndex, setImgIndex] = useState(0);

   const transitions = useTransition(images[imgIndex], (item) => item, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses,
   });

   useEffect(
      () =>
         void setInterval(() => setImgIndex((state) => (state + 1) % 4), 3000),
      []
   );
   return transitions.map(({ item, props, key }) => (
      <ImgSlider
         className="p-0"
         key={key}
         style={{ ...props, backgroundImage: `url(${item})` }}
      ></ImgSlider>
   ));
};

export default HeroImgSlider;
