import React, { useState, useContext } from "react";
import TimeAgo from "timeago-react"; //
import { Link } from "react-router-dom";
import {
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from "react-accessible-accordion";
import styled from "styled-components";
import "react-accessible-accordion/dist/fancy-example.css";
import FormBtn from "../components/SubComponents/FormBtn";
import { UserContext } from "../context/UserContext";

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
   const { user } = useContext(UserContext);

   const [isPaid, setIsPaid] = useState({ isPaid: null });
   const [status, setStatus] = useState({ status: "" });

   // useEffect(() => {
   //    setTransactionForm({

   //    });
   //    return () => {
   //       setTransactionForm({});
   //    };
   // }, []);

   const [isRedirect, setisRedirect] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e) => {
      if (e.target.name === "isPaid") {
         setIsPaid({ isPaid: e.target.value }, console.log(isPaid, status));
      }
      if (e.target.name === "status") {
         setStatus({ status: e.target.value }, console.log(isPaid, status));
      }
      console.log(isPaid, status);
   };

   const defineTransStatus = (transStatus) => {
      if (transStatus === "Pending") {
         return "Pending";
      }
      if (transStatus === "Confirmed") {
         return "Confirmed";
      }
      if (transStatus === "Rejected") {
         return "Rejected";
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);

      let qry = { isPaid: isPaid, status: status };
      console.log(JSON.stringify(qry));

      fetch(
         `https://thehomesphereapi.herokuapp.com/transactions/${transaction._id}`,
         {
            method: "put",
            body: JSON.stringify(qry),
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${localStorage["userToken"]}`,
            },
         }
      )
         .then((response) => {
            console.log(response);
            return response.json();
         })
         .then((data) => {
            console.log(data);
            setIsLoading(false);
            setisRedirect(true);
         });
   };

   // if (isRedirect) {
   //    return <Redirect to={`/transactions/${transaction._id}`} />;
   // }

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
            {user.isAdmin ? (
               <form onSubmit={handleSubmit} className="m-0">
                  <div className="input-group m-0 p-0 mt-2 col-6">
                     <div className="input-group-prepend">
                        <label
                           className="input-group-text"
                           htmlFor="inputGroupSelect01"
                        >
                           Payment Status
                        </label>
                     </div>
                     <select
                        className="custom-select"
                        id="status"
                        defaultValue={transaction.isPaid ? true : false}
                        onChange={(e) => setIsPaid(e.target.value)}
                        name="isPaid"
                     >
                        <option value={true}>Paid</option>
                        <option value={false}>Unpaid</option>
                     </select>
                  </div>

                  <div className="input-group m-0 p-0 mt-2 col-6">
                     <div className="input-group-prepend">
                        <label
                           className="input-group-text"
                           htmlFor="inputGroupSelect02"
                        >
                           Status
                        </label>
                     </div>
                     <select
                        className="custom-select"
                        id="status"
                        defaultValue={defineTransStatus(transaction.status)}
                        onChange={handleChange}
                        name="status"
                     >
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                     </select>
                     <SubmitBtn formValid={true} isLoading={isLoading} />
                  </div>
               </form>
            ) : (
               ""
            )}
         </AccordionItemPanel>
      </AccordionItem>
   );
}
