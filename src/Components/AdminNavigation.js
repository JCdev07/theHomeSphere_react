import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavigationBar = styled.nav`
   padding-left: 60px;
   padding-right: 60px;

   & #register {
      cursor: pointer;
      position: relative;
      height: 100%;
      width: 100%;
      transition: all 0.3s ease;
      border-radius: 120px;
      overflow: hidden;
      border: 1px solid #d8d8d8;
      background-color: rgb(51, 0, 102, 1);
      padding-left: 30px;
      padding-right: 30px;
      color: #fff;
      font-weight: 600;

      &:hover {
         background-color: #fff;
         color: black;
         border: 1px solid 1px solid rgb(51, 0, 102, 1);
      }

      &::before {
         content: "";
         height: 100%;
         width: 100%;
         z-index: 1000;
         display: block;
         background-color: blue;
         top: 0;
         left: 0;
         position: absolute;
         background-color: rgb(51, 0, 102, 0.4);
         transition: all 0.3s ease;
      }

      &:hover::before {
         background-color: rgb(51, 0, 102, 0.35);
         border: 1px solid 1px solid rgb(51, 0, 102, 1);
      }
   }

   & #logger {
      cursor: pointer;
      position: relative;
      height: 100%;
      width: 100%;
      transition: all 0.3s ease;
      border-radius: 120px;
      overflow: hidden;
      padding-left: 30px;
      padding-right: 30px;
      color: #1f2533;
      font-weight: 600;
      border: 1px solid transparent;

      &:hover {
         color: rgb(51, 0, 102, 1);
         border: 1px solid rgb(51, 0, 102, 1);
      }
   }
`;

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

const UserNavigation = ({ user }) => {
   console.log(user, user.isAuth, user.isAdmin);

   return (
      <>
         <NavigationBar className="navbar navbar-expand-lg navbar-light bg-light">
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

                  {user.isAdmin && user.isAuth ? (
                     <>
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
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/properties"
                           >
                              All Property
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     ""
                  )}

                  {user.isAuth && !user.isAdmin ? (
                     <>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/properties"
                           >
                              All Property
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/confirmbooking"
                           >
                              Booking
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/transactions"
                           >
                              Transactions
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     ""
                  )}

                  {!user.isAuth ? (
                     <>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/properties"
                           >
                              All Property
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link"
                              to="/confirmbooking"
                           >
                              Booking
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     ""
                  )}
               </ul>

               <ul className="navbar-nav ml-auto d-flex align-items-center">
                  {!user.isAuth ? (
                     <>
                        <li className="nav-item mr-2">
                           <NavLink
                              activeClassName="active"
                              className="nav-link logger"
                              id="logger"
                              to="/login"
                           >
                              Login
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link logger"
                              id="register"
                              to="/register"
                           >
                              Register
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className="nav-item mr-3">
                           Welcome! {user.firstname}
                        </li>
                        <li className="nav-item">
                           <NavLink
                              activeClassName="active"
                              className="nav-link logger"
                              id="logger"
                              to="/logout"
                           >
                              Logout
                           </NavLink>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </NavigationBar>
      </>
   );
};

export default UserNavigation;
