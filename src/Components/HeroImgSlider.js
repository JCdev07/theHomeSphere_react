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
`;

// @ sliderImages === array of object with images

const HeroImgSlider = ({ properties }) => {
   const images = [
      "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/358502/pexels-photo-358502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/373893/pexels-photo-373893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
         key={key}
         style={{ ...props, backgroundImage: `url(${item})` }}
      ></ImgSlider>
   ));
};

export default HeroImgSlider;
