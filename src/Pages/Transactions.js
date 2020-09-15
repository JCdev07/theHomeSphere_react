import React, { useState, useEffect } from "react";
import TimeAgo from "timeago-react"; //
import { Link } from "react-router-dom";
import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from "react-accessible-accordion";
import styled from "styled-components";
import "react-accessible-accordion/dist/fancy-example.css";

const AccordionContainer = styled.div`
   & .accordion__button:before {
      transition: all 0.2s ease;
   }
`;

const StyledLink = styled(Link)`
   &:link,
   &:visited,
   &:hover {
      text-decoration: none;
      color: steelblue;
   }
`;

export default function Transactions() {
   const [transactions, setTransactions] = useState([]);

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(true);
      fetch(`https://thehomesphereapi.herokuapp.com/transactions`, {
         headers: {
            Authorization: `Bearer ${localStorage["userToken"]}`,
         },
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.request == "succes") {
               setTransactions(data.transactions);
               setIsLoading(false);
            }
         });
      return () => {
         setTransactions([]);
      };
   }, []);

   const AccordionList = transactions.map((transaction) => {
      return (
         <AccordionItem key={transaction._id} className="mb-2">
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
            </AccordionItemPanel>
         </AccordionItem>
      );
   });
   return (
      <div className="container">
         <div className="row mt-5">
            <AccordionContainer className="col-12 col-md-10 col-lg-8 mx-auto">
               <Accordion allowZeroExpanded>{AccordionList}</Accordion>
            </AccordionContainer>
         </div>
      </div>
   );
}
