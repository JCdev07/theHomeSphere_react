import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CarouselCont from "./../components/Carousel";
import { useParams } from "react-router-dom";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import styled from "styled-components";
import { FaBed, FaCarAlt, FaBath, FaCoffee } from "react-icons/fa";
import { BiWifi2, BiFridge, BiSend } from "react-icons/bi";
import { ImSpoonKnife } from "react-icons/im";
import { SiNetflix } from "react-icons/si";
import { RiCake2Fill } from "react-icons/ri";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import cogoToast from "cogo-toast";

const Header = styled.div`
   & .carousel-slider {
      & .carousel-img {
         height: 100%;
         object-fit: cover;
         object-position: center;
      }
      & .carousel-img-div {
         height: 70vh;
      }
   }
`;

const BtnWithSpinner = styled.button`
   background-color: #330066;
   color: #fff;
   border: 2px solid #fff;
   font-weight: 600;
   width: 100%;
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
   }

   &:disabled,
   &[disabled] {
      border: 1px solid #7851a9;
      background-color: #7851a9;
   }
`;

const DetailCont = styled.div`
   border: 2px solid #d8d8d8;
   box-sizing: border-box;
   padding: 1rem;
   font-size: 1rem;
   border-radius: 5px;
   background-color: #fff;

   & span {
      margin-top: 0.3rem;
   }

   & svg {
      color: #676767;
      fill: #676767;
      font-size: 0.9rem;
   }
   & .list-group-item {
      border: none;
   }
`;

const PropertySingle = ({ user }) => {
   const [property, setProperty] = useState({});

   const { id } = useParams();
   console.log(id, user);
   const [isLoading, setIsLoading] = useState(true);

   const [isRedirect, setIsRedirect] = useState(false);

   const [bookingDetails, setBookingDetails] = useState({
      property: "",
      startDate: "",
      endDate: "",
   });

   const [category, setCategory] = useState({});

   const [bookingConfirm, setBookingConfirm] = useState({});

   let effectDep = id;

   useEffect(() => {
      setIsLoading(true);
      if (setIsLoading) {
         cogoToast.loading("Loading Property Details...").then(() => {
            cogoToast.success("Property Successfully Loaded");
         });
      }
      fetch(`https://thehomesphereapi.herokuapp.com/properties/${id}`)
         .then((response) => {
            console.log(response);
            return response.json();
         })
         .then((data) => {
            console.log(data);
            setProperty(data.property);
            setCategory(data.property.category);
            setIsLoading(false);
            setBookingDetails({
               ...bookingDetails,
               property: data.property._id,
            });
            setIsLoading(false);
         });
   }, [effectDep]);
   const handleClick = () => {
      localStorage["booking"] = JSON.stringify(bookingDetails);
      if (setIsLoading) {
         cogoToast.loading("Preparing Your Booking Details...").then(() => {
            cogoToast.success("Please Confirm Your Booking Details.");
         });
      }
      fetch(`https://thehomesphereapi.herokuapp.com/booking`, {
         method: "POST",
         body: JSON.stringify(bookingDetails),
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage["userToken"]}`,
         },
      })
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            if (data.request === "success") {
               localStorage["booking"] = JSON.stringify(data.bookingDetails);
               setBookingConfirm(data.bookingDetails);
               setIsRedirect(true);
            }
            setIsLoading(false);
         });
      setIsRedirect(true);
   };

   if (isRedirect) {
      return (
         <Redirect
            to={{
               pathname: "/confirmbooking",
               state: { bookingDetails: bookingConfirm },
            }}
         />
      );
   }

   const onDateChange = (startDate, endDate) => {
      setBookingDetails({
         ...bookingDetails,
         startDate,
         endDate,
      });
   };
   return (
      <>
         <div className="container-fluid">
            <div className="row">
               <Header className="col-12 p-0">
                  {property.images ? (
                     <CarouselCont
                        propertyImages={property.images}
                        coverImage={property.coverImage}
                     />
                  ) : (
                     ""
                  )}
               </Header>
            </div>
         </div>
         <div className="container mb-5">
            <div className="row">
               <div className="col-12 col-md-8 col-lg-6 mt-4 mx-auto">
                  {!user.isAdmin ? (
                     <div className="col-12 justify-content-center align-items-center mb-3">
                        <RangeDatePicker
                           highlightToday
                           onChange={(startDate, endDate) =>
                              onDateChange(startDate, endDate)
                           }
                           startDatePlaceholder="Start Date"
                           endDatePlaceholder="End Date"
                        />
                        <BtnWithSpinner
                           className="ml-2 mt-2 d-flex justify-content-center align-items-center w-50 mx-auto"
                           onClick={handleClick}
                        >
                           <span>Book</span>
                           <BiSend />
                        </BtnWithSpinner>
                     </div>
                  ) : (
                     ""
                  )}
                  <div className="d-flex justify-content-between align-items-center px-3">
                     <HeadingH2 text={property.name} />
                     <h6>&#8369; {property.price}.00 / Night</h6>
                  </div>
                  <h6 className="px-3">{category.name}</h6>
                  <h6 className="px-3">
                     {property.address ? property.address : ""}
                  </h6>
                  {!isLoading ? (
                     <div>
                        <DetailCont className="features-group mt-3">
                           <h6>Details</h6>
                           <div className="product-options d-flex justify-content-between align-items-center">
                              <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                                 <FaBed />
                                 <span>{property.details.bedroom}</span>
                              </div>
                              <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                                 <FaBath />
                                 <span>{property.details.bathroom}</span>
                              </div>
                              <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                                 <FaCarAlt />
                                 <span>{property.details.carSlot}</span>
                              </div>
                              <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                                 <span className="m-0 p-0">Land Area</span>
                                 <span>
                                    {property.details.landArea}&#13217;
                                 </span>
                              </div>
                              <div className="property-options-group d-flex flex-column align-items-center justify-content-center">
                                 <span className="m-0 p-0">Floor Area</span>
                                 <span>
                                    {property.details.floorArea}&#13217;
                                 </span>
                              </div>
                           </div>
                        </DetailCont>
                        <DetailCont className="features-group mt-3">
                           <h6>Ameneties & Freebies</h6>
                           <ul className="list-group">
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <BiWifi2 />
                                    <span className="m-0 ml-2">
                                       Free 100mbps Wifi
                                    </span>
                                 </div>
                              </li>
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <FaCoffee />
                                    <span className="m-0 ml-2">
                                       Free Coffee
                                    </span>
                                 </div>
                              </li>
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <ImSpoonKnife />
                                    <span className="m-0 ml-2">
                                       Free Breakfast
                                    </span>
                                 </div>
                              </li>
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <SiNetflix />
                                    <span className="m-0 ml-2">
                                       Free Netflix
                                    </span>
                                 </div>
                              </li>
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <BiFridge />
                                    <span className="m-0 ml-2">
                                       Free Fridge
                                    </span>
                                 </div>
                              </li>
                              <li className="list-group-item p-0">
                                 <div className="property-options-group d-flex align-items-center">
                                    <RiCake2Fill />
                                    <span className="m-0 ml-2">
                                       Free Cake on Your Birthday
                                    </span>
                                 </div>
                              </li>
                           </ul>
                        </DetailCont>
                     </div>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default PropertySingle;
