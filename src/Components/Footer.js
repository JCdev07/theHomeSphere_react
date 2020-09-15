import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FooterLink = styled(NavLink)`
   text-decoration: none;
   margin-left: 10px;
   color: black;
`;

export default function Footer() {
   return (
      <div className="App">
         <div>
            <br />
            <br />
            <div className="container-footer">
               <FooterLink to="#">About us</FooterLink>
               <FooterLink to="#">Careers</FooterLink>
               <FooterLink to="#">Contact Us</FooterLink>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="d-flex justify-content-center col-4 mx-auto">
                     <p className="mb-1">Follow Us</p>
                  </div>
                  <div className="footer d-flex justify-content-around col-4 mx-auto mb-3">
                     <img
                        src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                        width="20px"
                     />
                     <img
                        src="https://www.aps.edu/sapr/images/pnglot.comtwitterbirdlogopng139932.png/image"
                        width="20px"
                     />
                     <img
                        src="https://imageog.flaticon.com/icons/png/512/106/106852.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                        width="20px"
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
