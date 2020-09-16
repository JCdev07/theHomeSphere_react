import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Accordion } from "react-accessible-accordion";
import styled from "styled-components";
import "react-accessible-accordion/dist/fancy-example.css";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import AccordionCont from "../components/Accordion";

const AccordionContainer = styled.div`
   & .accordion__button:before {
      transition: all 0.2s ease;
   }
`;

export default function Transactions() {
   const [transactions, setTransactions] = useState([]);

   const [transactionCount, setTransactionCount] = useState("");

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
               setTransactionCount(data.transactions.length);
            }
         });
      return () => {
         setTransactions([]);
      };
   }, []);

   const AccordionList = transactions.map((transaction) => {
      return <AccordionCont transaction={transaction} key={transaction._id} />;
   });
   return (
      <div className="container">
         <div className="row mt-5">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
               <HeadingH2 text="Transactions" />
            </div>
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
               <span>Showing {transactionCount} transactions</span>
            </div>
         </div>
         <div className="row mt-2">
            <AccordionContainer className="col-12 col-md-10 col-lg-8 mx-auto">
               <Accordion allowZeroExpanded>{AccordionList}</Accordion>
            </AccordionContainer>
         </div>
      </div>
   );
}
