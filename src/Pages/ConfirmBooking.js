import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import FormBtn from "./../components/SubComponents/FormBtn";
import styled from "styled-components";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { FaStripe, FaCcPaypal } from "react-icons/fa";

const PaymentOption = styled.div`
   & svg {
      font-size: 3rem;
   }
`;

const BtnWithSpinner = styled.button`
   background-color: #519e8a;
   color: #fff;
   border: 2px solid #519e8a;
   width: 100%;
   margin-top: 1em;
   padding: 8px 0px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   margin-bottom: 0.25em;
   transition: all 0.3s ease;
   position: relative;

   &:focus {
      border: 2px solid transparent;
   }

   &[disabled] {
      color: #fff;
   }
`;

const ConfirmBooking = (props) => {
   const [bookingDetails, setbookingDetails] = useState(
      props.location.state.bookingDetails
   );

   const [bookingForm, setBookingForm] = useState({
      property: bookingDetails.property._id,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      paymentMode: "Over The Counter",
   });

   const [transactionDetails, setTransactionDetails] = useState({});

   const [isLoading, setIsLoading] = useState(false);
   const [isRedirect, setIsRedirect] = useState(false);

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

      setBookingForm({
         ...bookingForm,
         startDate: new Date(startDate),
         endDate: new Date(endDate),
      });
      console.log(bookingForm);
   };

   const handleClick = () => {
      setIsLoading(true);
      console.log(bookingForm);
      fetch(`https://thehomesphereapi.herokuapp.com/transactions`, {
         method: "POST",
         body: JSON.stringify(bookingForm),
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
            if (data.request == "success") {
               setTransactionDetails(data.transaction);
               setIsLoading(false);
               setIsRedirect(true);
            }
         });
   };

   if (isRedirect) {
      console.log(transactionDetails);
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
      <div className="container">
         <div className="row mt-5">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
               <div className="col-12"></div>
               <HeadingH2 text="Confirm Booking" />
               <div className="card ">
                  <div className="card-header p-3 ">
                     <div className="d-flex justify-content-between align-items-center">
                        <h2>{bookingDetails.property.name}</h2>
                        <h5>
                           &#8369; {bookingDetails.property.price}.00 / Night
                        </h5>
                     </div>
                     <div className="col-12 p-0">
                        <h6>{bookingDetails.property.category.name}</h6>
                     </div>
                  </div>
                  <div className="card-body">
                     <RangeDatePicker
                        startDate={bookingDetails.startDate}
                        endDate={bookingDetails.endDate}
                        startDatePlaceholder="From"
                        endDatePlaceholder="To"
                        highlightToday
                        onChange={(startDate, endDate) =>
                           onDateChange(startDate, endDate)
                        }
                        startDatePlaceholder="Start Date"
                        endDatePlaceholder="End Date"
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
                  <div className="col-10 mx-auto">
                     <BtnWithSpinner onClick={handleClick}>
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
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmBooking;
