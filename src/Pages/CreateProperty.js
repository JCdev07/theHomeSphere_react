import React, { useState, useEffect } from "react";
import ModalToggler from "../components/SubComponents/ModalToggler";
import PropertyAddModal from "../components/PropertyAddModal";
import PropertyAdminCard from "../components/PropertyAdminCard";

const CreateProperty = () => {
   const [properties, setProperties] = useState([]);
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!categories.length) {
         fetch("https://thehomesphereapi.herokuapp.com/categories")
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               console.log(data);
               setCategories(data.categories);
            });
      }
   }, []);

   useEffect(() => {
      setIsLoading(true);
      fetch("https://thehomesphereapi.herokuapp.com/properties")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            console.log(data);
            setProperties(data.properties);
            setIsLoading(false);
         });
   }, []);

   const propertyAdminCards = properties.map((property) => {
      return (
         <PropertyAdminCard
            property={property}
            categories={categories}
            key={property._id}
         />
      );
   });

   return (
      <>
         <div className="container">
            <div className="row mt-3">
               <div className="col-12 mx-auto">
                  <h1>Property</h1>
               </div>
            </div>
            <div className="row">
               <div className="col-12 mx-auto">
                  <PropertyAddModal categories={categories} />
               </div>
            </div>
            <div className="row">{propertyAdminCards}</div>
         </div>
      </>
   );
};

export default CreateProperty;
