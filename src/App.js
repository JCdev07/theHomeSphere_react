import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastProvider } from "react-toast-notifications";

// PAGES
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Properties from "./Pages/Properties";
import PropertySingle from "./Pages/PropertySingle";
import Transactions from "./Pages/Transactions";
import TransactionSingle from "./Pages/TransactionSingle";
import ConfirmBooking from "./Pages/ConfirmBooking";
import UserNavigation from "./components/UserNavigation";

function App() {
   const [user, setUser] = useState({
      isAuth: false,
      id: "",
      firstname: "",
      lastname: "",
      email: "",
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
               console.log(response);
               return response.json();
            })
            .then((data) => {
               console.log(data);
               if (data.user) {
                  setUser({
                     isAuth: true,
                     id: data.user._id,
                     firstname: data.user.firstname,
                     lastname: data.user.lastname,
                     email: data.user.email,
                  });
               }
            });
      }
   }, []);

   return (
      <Router>
         <UserContext.Provider value={{ user, setUser }}>
            <div className="App">
               <UserNavigation />

               <Switch>
                  <ToastProvider>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/login" component={Login} />
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
                     <Route exact path="/admin" component={Admin} />
                  </ToastProvider>
               </Switch>
            </div>
         </UserContext.Provider>
      </Router>
   );
}

export default App;
