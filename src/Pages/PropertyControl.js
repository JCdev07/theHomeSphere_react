import React, { useState, useEffect, useContext } from "react";
import PropertyAddModal from "../components/PropertyAddModal";
import PropertyAdminCard from "../components/PropertyAdminCard";
import HeadingH2 from "../components/SubComponents/HeadingH2";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import { AppContext } from "../context/AppProvider";
import { Redirect } from "react-router-dom";

const PropertiesControlCont = styled.div`
   min-height: 70vh;
`;
const CreateProperty = ({ user }) => {
   // const [user] = useContext(AppContext);
   const [properties, setProperties] = useState([]);
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      cogoToast.loading("Loading All Assets...", { hideAfter: 3 });
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

   console.log(user);
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
         <PropertiesControlCont className="container">
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
         </PropertiesControlCont>
      </>
   );
};

export default CreateProperty;
