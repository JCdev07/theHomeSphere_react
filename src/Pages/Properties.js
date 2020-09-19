import React, { useState, useEffect } from "react";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import AllPropertiesCard from "./../components/AllPropertiesCard";
import cogoToast from "cogo-toast";
import styled from "styled-components";

const PropertiesCont = styled.div`
   min-height: 70vh;
`;

const Properties = () => {
   const [properties, setProperties] = useState([]);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      if (setIsLoading) {
         cogoToast.loading("Loading All Properties...").then(() => {
            cogoToast.success("All Property Successfully Loaded");
         });
      }
      fetch("https://thehomesphereapi.herokuapp.com/properties")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            setProperties(data.properties);
            setIsLoading(false);
         });

      return function cleanup() {
         setProperties([]);
      };
   }, []);

   const PropertyList = properties.map((property) => {
      return <AllPropertiesCard property={property} key={property._id} />;
   });

   return (
      <PropertiesCont className="container mb-5">
         <div className="row">
            <div className="col-12">
               <HeadingH2 text="All Properties Available" />
            </div>
         </div>
         <div className="row mt-4">{PropertyList}</div>
      </PropertiesCont>
   );
};

export default Properties;
