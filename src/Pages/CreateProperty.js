import React, { useState, useEffect } from "react";
import ModalToggler from "../components/SubComponents/ModalToggler";
import PropertyModal from "../components/SubComponents/PropertyModal";

const CreateProperty = () => {
   const [properties, setProperties] = useState([]);
   const [categories, setCategories] = useState([]);

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
                  <PropertyModal categories={categories} />
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateProperty;
