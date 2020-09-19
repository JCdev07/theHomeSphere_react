import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import styled from "styled-components";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { FaStripe, FaCcPaypal } from "react-icons/fa";
import cogoToast from "cogo-toast";

const PaymentOption = styled.div`
   & svg {
      font-size: 3rem;
   }
`;

const ConfirmCont = styled.div`
   min-height: 75vh;
`;

const BtnWithSpinner = styled.button`
   background-color: #330066;
   color: #fff;
   border: 2px solid #fff;
   font-weight: 600;
   width: 40%;
   margin-top: 1em;
   padding: 8px 0px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   margin-bottom: 0.25em;
   transition: all 0.3s ease;
   border-radius: 120px;

   &:hover {
      color: #330066;
      background-color: #fff;
      border: 2px solid #330066;

      &[disabled] {
         color: #fff;
      }
   }

   &[disabled] {
      border: 1px solid #7851a9;
      background-color: #7851a9;
   }
`;

const BtnDelete = styled.button`
   background-color: #e8135d;
   color: #fff;
   border: 2px solid #fff;
   font-weight: 600;
   width: 40%;
   margin-top: 1em;
   padding: 8px 0px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   margin-bottom: 0.25em;
   transition: all 0.3s ease;
   border-radius: 120px;

   &:hover {
      color: #e8135d;
      background-color: #fff;
      border: 2px solid #e8135d;

      &[disabled] {
         color: #fff;
      }
   }

   &[disabled] {
      border: 1px solid #7851a9;
      background-color: #7851a9;
   }
`;

const ConfirmBooking = ({ user }) => {
   const [bookingDetails, setbookingDetails] = useState({});

   const [property, setProperty] = useState({});

   const [transactionDetails, setTransactionDetails] = useState({});

   const [isLoading, setIsLoading] = useState(false);
   const [isRedirect, setIsRedirect] = useState(false);

   const [formValid, setFormValid] = useState(false);
   const [isBookingDeleted, setisBookingDeleted] = useState(false);

   let bookingCredentials = localStorage["booking"];

   useEffect(() => {
      setIsLoading(true);
      if (bookingCredentials) {
         cogoToast.loading("Preparing Your Booking Details...").then(() => {
            cogoToast.success("Please Confirm Your Booking Details.");
         });
      } else {
         cogoToast.error("You Dont Have a Booking Details...");
         setIsLoading(false);
      }

      if (bookingCredentials) {
         fetch(`https://thehomesphereapi.herokuapp.com/booking`, {
            method: "POST",
            body: bookingCredentials,
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${localStorage["userToken"]}`,
            },
         })
            .then((res) => {
               console.log(res);
               return res.json();
            })
            .then((data) => {
               console.log(data.bookingDetails);
               setbookingDetails({
                  ...data.bookingDetails,
                  paymentMode: "Over The Counter",
               });
               setProperty(data.bookingDetails.property);
               console.log(bookingDetails);
               setFormValid(true);
               setIsLoading(false);
            });
         setIsLoading(false);
      }

      return () => {
         setbookingDetails({});
      };
   }, []);

   if (property.name) {
      console.log(property);
   }

   const onDateChange = (startDate, endDate) => {
      startDate = new Date(startDate).getTime();
      endDate = new Date(endDate).getTime();
      let totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

      let total = bookingDetails.property.price * totalDays;

      setbookingDetails({
         ...bookingDetails,
         bookingDays: totalDays,
         subtotal: total,
      });
   };

   const handleClick = () => {
      setIsLoading(true);

      if (setIsLoading) {
         cogoToast.loading("Confirming Booking Details...").then(() => {
            cogoToast.success("Booking Success");
         });
      }
      fetch(`https://thehomesphereapi.herokuapp.com/transactions`, {
         method: "POST",
         body: JSON.stringify(bookingDetails),
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage["userToken"]}`,
         },
      })
         .then((response) => {
            console.log(response);
            return response.json();
         })
         .then((data) => {
            console.log(data);
            if (data.request == "success") {
               setTransactionDetails(data.transaction);
               setIsLoading(false);
               setIsRedirect(true);
               localStorage.removeItem("booking");
            }
         });
      setIsLoading(true);
   };

   const handleDelete = () => {
      localStorage.removeItem("booking");
      cogoToast.warn("Booking removed...");
      setisBookingDeleted(true);
   };

   if (isBookingDeleted) {
      return <Redirect to="/" />;
   }
   if (isRedirect) {
      return (
         <Redirect
            to={{
               pathname: `/transactions/${transactionDetails._id}`,
               state: { transactionDetails: transactionDetails },
            }}
         />
      );
   }

   return (
      <ConfirmCont className="container">
         <div className="row mt-5">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
               <div className="col-12"></div>
               <HeadingH2 text="Confirm Booking" />
               <div className="card pb-3">
                  <div className="card-header p-3 ">
                     <div className="d-flex justify-content-between align-items-center">
                        <h2>{property.name}</h2>
                        <h5>&#8369; {property.price}.00 / Night</h5>
                     </div>
                     <div className="col-12 p-0">
                        <h6>{property.address}</h6>
                     </div>
                  </div>
                  <div className="card-body">
                     <RangeDatePicker
                        startDate={bookingDetails.startDate}
                        endDate={bookingDetails.endDate}
                        highlightToday
                        onChange={(startDate, endDate) =>
                           onDateChange(startDate, endDate)
                        }
                        startDatePlaceholder="Start Date"
                        endDatePlaceholder="End Date"
                        disabled={!formValid}
                     />
                     <PaymentOption className="col-12 my-3">
                        <RadioGroup horizontal value="Over The Counter">
                           <RadioButton value="Over The Counter" selected>
                              Over The Counter
                           </RadioButton>
                           <RadioButton value="Stripe" disabled>
                              <FaStripe />
                           </RadioButton>
                           <RadioButton value="Paypal" disabled>
                              <FaCcPaypal />
                           </RadioButton>
                        </RadioGroup>
                     </PaymentOption>
                     <div className="col mt-3">
                        <h6>Total Days: {bookingDetails.bookingDays}</h6>
                        <h2>Total: &#8369; {bookingDetails.subtotal}.00</h2>
                     </div>
                  </div>
                  <div className="col-10 mx-auto d-flex justify-content-between">
                     <BtnWithSpinner
                        onClick={handleClick}
                        disabled={!formValid}
                     >
                        {isLoading ? (
                           <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                           ></span>
                        ) : (
                           "Confirm Booking"
                        )}
                     </BtnWithSpinner>
                     <BtnDelete onClick={handleDelete}>
                        Cancel
                        <svg
                           width="1em"
                           height="1em"
                           viewBox="0 0 16 16"
                           className="bi bi-trash ml-1"
                           fill="currentColor"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                           <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                           />
                        </svg>
                     </BtnDelete>
                  </div>
               </div>
            </div>
         </div>
      </ConfirmCont>
   );
};

export default ConfirmBooking;
