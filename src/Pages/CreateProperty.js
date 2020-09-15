import React, { useState, useEffect } from "react";
import PropertyAddModal from "../components/PropertyAddModal";
import PropertyAdminCard from "../components/PropertyAdminCard";
import HeadingH2 from "../components/SubComponents/HeadingH2";

const CreateProperty = () => {
   const [properties, setProperties] = useState([]);
   const [categories, setCategories] = useState([]);
   const [transactions, setTransactions] = useState([]);
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
            setProperties(data.properties);
         });

      return function cleanup() {
         setProperties([]);
      };
   }, []);

   useEffect(() => {
      setIsLoading(true);
      fetch("https://thehomesphereapi.herokuapp.com/transactions")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            setTransactions(data.transactions);
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
            <div className="row">{propertyAdminCards}</div>
            <div className="row mt-3">
               <div className="col-12 mx-auto">
                  <HeadingH2 text="Transactions Control" />
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateProperty;
