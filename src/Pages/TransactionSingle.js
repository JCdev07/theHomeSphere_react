import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Badge from "../components/SubComponents/Badge";
import { FaBed, FaCarAlt, FaBath, FaCoffee } from "react-icons/fa";
import { BiWifi2, BiFridge, BiSend } from "react-icons/bi";
import { ImSpoonKnife } from "react-icons/im";
import { SiNetflix } from "react-icons/si";
import { RiCake2Fill } from "react-icons/ri";
import { RangeDatePicker } from "react-google-flight-datepicker";

const TransContainer = styled.div`
   background-color: #fff;
   height: 70vh;

   color: #fff;
   padding: 1rem;
   & .heading {
      font-weight: 400;
   }

   & .col-12 span {
      font-weight: 700;
   }

   & .row {
      height: 100%;
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.1);
   }
`;
const TransDetailsContainer = styled.div`
   color: black;
   background: #ddf1fa;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
`;

const TransDetailsContainer2 = styled.div`
   background: #ffff;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   color: black;
   padding: 2rem;
`;

const TransactionSingle = () => {
   const { id } = useParams();

   const [transactionDetails, setTransactionDetails] = useState({});

   const [property, setProperty] = useState({});

   const [propertyDetails, setPropertyDetails] = useState({});

   const [user, setUser] = useState({});

   useEffect(() => {
      fetch(`https://thehomesphereapi.herokuapp.com/transactions/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage["userToken"]}`,
         },
      })
         .then((response) => {
            console.log(response);
            return response.json();
         })
         .then((data) => {
            if (data.request == "success") {
               console.log(data);
               setTransactionDetails(data.transaction);
               setProperty(data.transaction.property);
               setUser(data.transaction.user);
               setPropertyDetails(data.transaction.property.details);
            }
         });
   }, [id]);

   const badgeStatus = (isPaid) => {
      return isPaid ? "success" : "warning";
   };

   return (
      <TransContainer className="container mt-5">
         <div className="row m-0">
            <TransDetailsContainer className="col-12 col-md-6 col-lg-4 p-3">
               <div className="detail-group ml-2">
                  <h6 className="heading m-0">Transaction Code:</h6>
                  <span>{transactionDetails.transactionId}</span>
               </div>
               <hr className="m-2" />
               <div className="detail-group ml-2">
                  <h6 className="heading m-0">Total Amount:</h6>
                  <span>&#8369; {transactionDetails.total}.00</span>
               </div>
               <hr className="m-2" />
               <div className="detail-group ml-2">
                  <h6 className="heading m-0">Start Date:</h6>
                  <span>
                     {new Date(transactionDetails.startDate).toDateString()}
                  </span>
               </div>
               <hr className="m-2" />
               <div className="detail-group ml-2">
                  <h6 className="heading m-0">End Date:</h6>
                  <span>
                     {new Date(transactionDetails.endDate).toDateString()}
                  </span>
               </div>
               <hr className="m-2" />
               <div className="detail-group ml-2">
                  <h6 className="heading m-0">Payment Mode</h6>
                  <span>{transactionDetails.paymentMode}</span>
               </div>
            </TransDetailsContainer>
            <TransDetailsContainer2 className="col-12 col-md-6 col-lg-8 m-">
               <div className="detail-group2 mb-auto d-flex justify-content-around">
                  <span>
                     <Badge
                        text={transactionDetails.isPaid ? "Paid" : "Unpaid"}
                        type={badgeStatus(transactionDetails.isPaid)}
                     />
                  </span>
                  <span>
                     Created At:{" "}
                     {new Date(transactionDetails.createdAt).toDateString()}
                  </span>
               </div>
               <hr className="mb-auto" />
               <div className="detail-group2 mb-auto">
                  <h6>Property Details:</h6>
                  <p>{property.name}</p>
                  <div className="product-options d-flex justify-content-around align-items-center">
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <FaBed />
                        <span>{propertyDetails.bedroom}</span>
                     </div>
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <FaBath />
                        <span>{propertyDetails.bathroom}</span>
                     </div>
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <FaCarAlt />
                        <span>{propertyDetails.carSlot}</span>
                     </div>
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <span className="m-0 p-0">Land Area</span>
                        <span>{propertyDetails.landArea}&#13217;</span>
                     </div>
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <span className="m-0 p-0">Floor Area</span>
                        <span>{propertyDetails.floorArea}&#13217;</span>
                     </div>
                  </div>
               </div>
               <hr className="mb-auto" />
               <div className="detail-group2 mb-auto">
                  <h6>User Details:</h6>
                  <div className="product-options d-flex justify-content-around align-items-center">
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <p className="m-0">Name:</p>
                        <span>
                           {user.firstname} {user.lastname}
                        </span>
                     </div>
                     <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                        <p className="m-0">Email:</p>
                        <span>{user.email}</span>
                     </div>
                  </div>
               </div>
            </TransDetailsContainer2>
         </div>
      </TransContainer>
   );
};

export default TransactionSingle;
