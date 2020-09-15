import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselCont = () => {
   return (
      <Carousel autoPlay={true} showArrows={true}>
         <div className="carousel-img-div">
            <img
               src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
               alt=""
               className="carousel-img"
            />
         </div>
         <div className="carousel-img-div">
            <img
               src="https://images.pexels.com/photos/3935346/pexels-photo-3935346.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
               alt=""
               className="carousel-img"
            />
         </div>
      </Carousel>
   );
};

export default CarouselCont;
