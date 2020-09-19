import React, { useState, useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import styled from "styled-components";
import "react-accessible-accordion/dist/fancy-example.css";
import HeadingH2 from "./../components/SubComponents/HeadingH2";
import AccordionCont from "../components/Accordion";
import cogoToast from "cogo-toast";

const AccordionContainer = styled.div`
   & .accordion__button:before {
      transition: all 0.2s ease;
   }

   & .accordion__button:focus {
      border: 2px solid #7851a9;
      outline: none;
      border-radius: 2px;
      background-color: #ae87d0;
      color: black;
   }
`;
const TransactionsCont = styled.div`
   min-height: 70vh;
`;

export default function Transactions() {
   const [transactions, setTransactions] = useState([]);

   const [transactionState, setTransactionState] = useState({});

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setIsLoading(true);
      if (setIsLoading) {
         cogoToast.loading("Loading All Transactions...").then(() => {
            cogoToast.success("Transactions Successfully Loaded");
         });
      }

      fetch(`https://thehomesphereapi.herokuapp.com/transactions`, {
         headers: {
            Authorization: `Bearer ${localStorage["userToken"]}`,
         },
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.request === "succes") {
               setTransactions(data.transactions);
               setIsLoading(false);
            }
         });
      return () => {
         setTransactions([]);
      };
   }, []);

   let transactionUnpaid = 0;
   let transactionPaid = 0;

   const AccordionListUnPaid = transactions.map((transaction) => {
      if (!transaction.isPaid) {
         transactionUnpaid++;
         return (
            <AccordionCont transaction={transaction} key={transaction._id} />
         );
      }
   });
   const AccordionListPaid = transactions.map((transaction) => {
      if (transaction.isPaid) {
         transactionPaid++;
         return (
            <AccordionCont transaction={transaction} key={transaction._id} />
         );
      }
   });
   return (
      <TransactionsCont className="container">
         <div className="row mt-5">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
               <HeadingH2 text="Transactions" />
            </div>
         </div>
         <div className="row">
            <div className="col-12 col-md-10 col-lg-6">
               <div className="col-12 col-md-10 col-lg-8 mx-auto p-0 mt-2">
                  <span>Showing {transactionUnpaid} Unpaid Transactions</span>
               </div>
               <div className="row mt-2">
                  <AccordionContainer className="col-12 col-md-10 col-lg-8 mx-auto">
                     <Accordion allowZeroExpanded>
                        {AccordionListUnPaid}
                     </Accordion>
                  </AccordionContainer>
               </div>
            </div>
            <div className="col-12 col-md-10 col-lg-6">
               <div className="col-12 col-md-10 col-lg-8 mx-auto p-0 mt-2">
                  <span>Showing {transactionPaid} Paid Transactions</span>
               </div>
               <div className="row mt-2">
                  <AccordionContainer className="col-12 col-md-10 col-lg-8 mx-auto">
                     <Accordion allowZeroExpanded>
                        {AccordionListPaid}
                     </Accordion>
                  </AccordionContainer>
               </div>
            </div>
         </div>
      </TransactionsCont>
   );
}
