import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PropertyAddModal from "../components/PropertyAddModal";
import PropertyAdminCard from "../components/PropertyAdminCard";
import HeadingH2 from "../components/SubComponents/HeadingH2";
import cogoToast from "cogo-toast";
import { Redirect } from "react-router-dom";

const CreateProperty = () => {
   const { user } = useContext(UserContext);

   const [properties, setProperties] = useState([]);
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      cogoToast.loading("Loading All Assets...", { hideAfter: 5 });
      if (!categories.length) {
         fetch("https://thehomesphereapi.herokuapp.com/categories")
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               setCategories(data.categories);
            });

         return function cleanup() {
            setCategories([]);
         };
      }
   }, []);

   useEffect(() => {
      setIsLoading(true);

      fetch("https://thehomesphereapi.herokuapp.com/properties")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            cogoToast.success("All Property Successfully Loaded", {
               position: "top-right",
            });
            setProperties(data.properties);
         });

      return function cleanup() {
         setProperties([]);
      };
   }, []);

   if (!user.isAdmin) {
      return <Redirect to="/404" />;
   }

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
                  <HeadingH2 text="Property Control" />
               </div>
            </div>
            <div className="row">
               <div className="col-12 mx-auto">
                  <PropertyAddModal categories={categories} />
               </div>
            </div>
            <div className="row" id="properties-container">
               {propertyAdminCards}
            </div>
         </div>
      </>
   );
};

export default CreateProperty;
