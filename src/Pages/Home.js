import React, { useContext, useEffect, useState } from "react";
import FeaturedProperties from "../components/FeaturedProperties";
import Hero from "../components/Hero";
import { UserContext } from "./../context/UserContext";

const Home = () => {
   const [properties, setProperties] = useState([]);

   useEffect(() => {
      // setIsLoading(true);
      fetch("https://thehomesphereapi.herokuapp.com/properties")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            setProperties(data.properties);
         });

      return function cleanup() {
         setProperties([]);
      };
   }, []);

   return (
      <div className="container-fluid my-5 px-5">
         <Hero properties={properties} />
         <FeaturedProperties properties={properties} />
      </div>
   );
};

export default Home;
