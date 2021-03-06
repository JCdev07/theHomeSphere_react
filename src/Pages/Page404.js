import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BtnWithSpinner = styled(Link)`
   background-color: #fff;
   color: #7851a9;
   border: 2px solid #7851a9;
   width: 20%;
   margin-top: 1em;
   padding: 8px 5px;
   font-size: 1em;
   font-weight: lighter;
   letter-spacing: 1px;
   margin-bottom: 0.25em;
   transition: all 0.3s ease;
   position: relative;
   border-radius: 120px;

   &:hover {
      color: #330066;
      background-color: #fff;
      border: 2px solid #330066;

      text-decoration: none;
   }

   &:disabled,
   &[disabled] {
      border: 1px solid #7851a9;
      background-color: #7851a9;
   }
`;

const Page404 = () => {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12">
               <div id="notfound">
                  <div className="notfound">
                     <div className="notfound-404 mb-5">
                        <h1>404</h1>
                     </div>
                     <h2>Oops! This Page Could Not Be Found</h2>
                     <p>
                        Sorry but the page you are looking for does not exist,
                        have been removed. name changed or is temporarily
                        unavailable
                     </p>
                     <BtnWithSpinner to="/">Go To Homepage</BtnWithSpinner>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Page404;
