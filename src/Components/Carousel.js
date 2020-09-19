import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselCont = (props) => {
   // const [propImages, setPropImages] = useState([]);

   // useEffect(() => {
   //    setPropImages(images);
   // }, [images]);
   const origImages = props.propertyImages.map((image) => {
      return (
         <div
            className="carousel-img-div"
            key={props.propertyImages.indexOf(image)}
         >
            <img
               src={`https://thehomesphereapi.herokuapp.com/${image}`}
               alt=""
               className="carousel-img"
            />
         </div>
      );
   });

   return (
      <Carousel autoPlay={true} showArrows={true}>
         <div className="carousel-img-div">
            <img
               src={`https://thehomesphereapi.herokuapp.com/${props.coverImage}`}
               alt=""
               className="carousel-img"
            />
         </div>
         <div className="carousel-img-div">
            <img
               src="https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
               alt=""
               className="carousel-img"
            />
         </div>
         <div className="carousel-img-div">
            <img
               src="https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
               alt=""
               className="carousel-img"
            />
         </div>
         <div className="carousel-img-div">
            <img
               src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
               alt=""
               className="carousel-img"
            />
         </div>

         {origImages}
      </Carousel>
   );
};

export default CarouselCont;
