import React, { useState, useContext, useEffect } from "react";
import TimeAgo from "timeago-react"; //
import { Link, Redirect } from "react-router-dom";
import {
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from "react-accessible-accordion";
import styled from "styled-components";
import "react-accessible-accordion/dist/fancy-example.css";
import FormBtn from "../components/SubComponents/FormBtn";
import { AppContext } from "../context/AppProvider";

const StyledLink = styled(Link)`
   &:link,
   &:visited,
   &:hover {
      text-decoration: none;
      color: steelblue;
   }
`;

const SubmitBtn = styled(FormBtn)`
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

export default function AccordionCont({ transaction }) {
   const [user, setUser] = useContext(AppContext);

   // const [transIspaid, setTransIspaid] = useState("");

   // const [transStatus, setTransStatus] = useState("")

   const [transState, setTransState] = useState({ isPaid: transaction.isPaid });

   const [isRedirect, setisRedirect] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(transState);
      setIsLoading(true);

      fetch(
         `https://thehomesphereapi.herokuapp.com/transactions/${transaction._id}`,
         {
            method: "put",
            body: JSON.stringify({ isPaid: true }),
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${localStorage["userToken"]}`,
            },
         }
      )
         .then((response) => {
            return response.json();
            console.log(response);
         })
         .then((data) => {
            console.log(data);
            setIsLoading(false);
            setisRedirect(true);
         });
   };

   if (isRedirect) {
      return <Redirect to={`/transactions/${transaction._id}`} />;
   }

   return (
      <AccordionItem className="mb-2">
         <AccordionItemHeading>
            <AccordionItemButton>
               {transaction.transactionId}
            </AccordionItemButton>
         </AccordionItemHeading>
         <AccordionItemPanel>
            <small className="p-0 m-0">
               <TimeAgo datetime={transaction.createdAt} />
            </small>
            <p className="p-0">
               {new Date(transaction.createdAt).toDateString()}
            </p>
            <h6 className="p-0 m-0 mb-2">&#8369; {transaction.total}.00</h6>
            <StyledLink to={`/transactions/${transaction._id}`}>
               View More Details
            </StyledLink>
            {user.isAdmin && !transaction.isPaid ? (
               <form onSubmit={handleSubmit} className="m-0">
                  <div className="input-group m-0 p-0 mt-2 col-6">
                     <SubmitBtn
                        formValid={true}
                        isLoading={isLoading}
                        text="Mark as Paid"
                     />
                  </div>
               </form>
            ) : (
               ""
            )}
         </AccordionItemPanel>
      </AccordionItem>
   );
}
