import React, { useState, useEffect } from "react";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import AllPropertiesCard from "./../components/AllPropertiesCard";
import styled from "styled-components";

const Properties = () => {
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

   const PropertyList = properties.map((property) => {
      return <AllPropertiesCard property={property} key={property._id} />;
   });

   return (
      <div className="container">
         <div className="row mt-4">
            <div className="col-12">
               <HeadingH2 text="All Properties Available to Rent" />
               <div className="d-flex col-6 col-md-4 col-lg-3 p-0 mt-2">
                  <select
                     name="sortBy"
                     id="sortBy"
                     className="form-control form-control-sm"
                  >
                     <option value="">Sort By</option>
                     <option value="">Price</option>
                     <option value="">Flr. Area</option>
                  </select>
                  <select
                     name="order"
                     id="order"
                     className="form-control form-control-sm ml-2"
                  >
                     <option value="">Sort Order</option>
                     <option value="">Asc</option>
                     <option value="">Desc</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="row mt-4">{PropertyList}</div>
      </div>
   );
};

export default Properties;
