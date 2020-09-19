import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FooterLink = styled(NavLink)`
   text-decoration: none;
   margin-left: 10px;
   color: black;
`;

const LineDiv = styled.div`
   text-align: center;
   display: relative;

   &::before,
   &::after {
      margin: auto;
      content: "";
      display: absolute;
      width: 40%;
      height: 1px;
      background-color: black;
      display: block;
   }

   &::before {
      top: 0;
   }
   &::after {
      bottom: 0;
   }
`;

export default function Footer() {
   return (
      <div className="App">
         <div>
            <br />
            <br />
            <div className="row">
               <LineDiv className="col-12 mx-auto text-center">
                  <FooterLink to="#">About us</FooterLink>
                  <FooterLink to="#">Careers</FooterLink>
                  <FooterLink to="#">Contact Us</FooterLink>
               </LineDiv>
            </div>
            <div className="row">
               <div className="col-12 mx-auto">
                  <div className="d-flex justify-content-center col-4 mx-auto my-2">
                     <p className="mb-1">Follow Us</p>
                  </div>
                  <div className="footer d-flex justify-content-around col-4 mx-auto mb-3">
                     <img
                        src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                        width="20px"
                        alt="soc-icon"
                     />
                     <img
                        src="https://www.aps.edu/sapr/images/pnglot.comtwitterbirdlogopng139932.png/image"
                        width="20px"
                        alt="soc-icon"
                     />
                     <img
                        src="https://i.pinimg.com/originals/72/a3/d9/72a3d9408d41335f39e9f014dc35cf44.jpg"
                        width="20px"
                        alt="soc-icon"
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12 mx-auto text-center">
                  <FooterLink to="#" className="copyright">
                     For Educational Purposes Only
                  </FooterLink>
               </div>
            </div>
         </div>
      </div>
   );
}
