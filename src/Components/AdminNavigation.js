import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const Logo = styled.p`
   font-size: 1.5rem;
   width: auto;
   color: #330066;
   font-weight: 600;
   margin: 0;
   position: relative;

   &::before {
      content: "";
      display: block;
      width: 60px;
      height: 3px;
      background-color: #330066;
      position: absolute;
      bottom: 0;
   }
`;

const UserNavigation = () => {
   const { user } = useContext(UserContext);
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
               <Logo>HomeSphere</Logo>
            </NavLink>
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/"
                     >
                        Home
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/property-control"
                     >
                        Property Control
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/transactions"
                     >
                        Transactions Control
                     </NavLink>
                  </li>
               </ul>
               <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                     {user.isAuth ? (
                        <NavLink
                           activeClassName="active"
                           className="nav-link"
                           to="/logout"
                        >
                           Logout
                        </NavLink>
                     ) : (
                        <NavLink
                           activeClassName="active"
                           className="nav-link"
                           to="/login"
                        >
                           Login
                        </NavLink>
                     )}
                  </li>
               </ul>
            </div>
         </nav>
      </>
   );
};

export default UserNavigation;
