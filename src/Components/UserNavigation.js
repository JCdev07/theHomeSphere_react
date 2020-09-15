import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserNavigation = () => {
   const { user } = useContext(UserContext);
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
               Navbar
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
                        to="/properties"
                     >
                        All Property
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
