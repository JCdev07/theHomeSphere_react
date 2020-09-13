import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastProvider } from "react-toast-notifications";
import Typography from "typography";
import injectFonts from "typography-inject-fonts";

// PAGES
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Properties from "./Pages/Properties";
import PropertySingle from "./Pages/PropertySingle";
import Transactions from "./Pages/Transactions";
import TransactionSingle from "./Pages/TransactionSingle";
import ConfirmBooking from "./Pages/ConfirmBooking";
import UserNavigation from "./components/UserNavigation";
import AdminNavigation from "./components/AdminNavigation";
import Logout from "./Pages/Logout";
import CreateProperty from "./Pages/CreateProperty";

function App() {
   const [user, setUser] = useState({
      isAuth: false,
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      isAdmin: false,
   });

   // booking: {
   //    property: "",
   //    startDate: "",
   //    endDate: "",
   // },
   // let userBooking = localStorage["booking"];

   useEffect(() => {
      let userCredentials = localStorage["userToken"];

      if (userCredentials) {
         fetch("https://thehomesphereapi.herokuapp.com/profile", {
            headers: {
               Authorization: `Bearer ${userCredentials}`,
            },
         })
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               if (data.user) {
                  setUser({
                     isAuth: true,
                     id: data.user._id,
                     firstname: data.user.firstname,
                     lastname: data.user.lastname,
                     email: data.user.email,
                     isAdmin: data.user.isAdmin,
                  });
               }
            });
      }
   }, []);

   const typography = new Typography({
      baseFontSize: "16px",
      baseLineHeight: 1.666,
      headerFontFamily: [
         "Avenir Next",
         "Helvetica Neue",
         "Segoe UI",
         "Helvetica",
         "Arial",
         "sans-serif",
      ],
      bodyFontFamily: ["Georgia", "serif"],
      // See below for the full list of options.
   });

   // Or insert styles directly into the <head> (works well for client-only
   // JS web apps.
   typography.injectStyles();

   return (
      <Router>
         <UserContext.Provider value={{ user, setUser }}>
            <div className="App" id="root">
               {user.isAdmin ? <AdminNavigation /> : <UserNavigation />}
               <Switch>
                  <ToastProvider>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/login" component={Login} />
                     <Route exact path="/logout" component={Logout} />
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/properties" component={Properties} />
                     <Route
                        exact
                        path="/properties/:id"
                        component={PropertySingle}
                     />
                     <Route
                        exact
                        path="/transactions"
                        component={Transactions}
                     />
                     <Route
                        exact
                        path="/transactions/:id"
                        component={TransactionSingle}
                     />
                     <Route
                        exact
                        path="/confirm-booking"
                        component={ConfirmBooking}
                     />

                     {/* Admin Only Route */}
                     <Route
                        exact
                        path="/create-property"
                        component={CreateProperty}
                     />
                  </ToastProvider>
               </Switch>
            </div>
         </UserContext.Provider>
      </Router>
   );
}

export default App;
