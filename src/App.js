import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Properties from "./Pages/Properties";
import PropertySingle from "./Pages/PropertySingle";
import Transactions from "./Pages/Transactions";
import SingleTransaction from "./Pages/SingleTransaction";
import ConfirmBooking from "./Pages/ConfirmBooking";
import AdminNavigation from "./components/AdminNavigation";
import Logout from "./Pages/Logout";
import CreateProperty from "./Pages/PropertyControl";
import Footer from "./components/Footer";
import Page404 from "./Pages/Page404";
import Error403 from "./Pages/Error403";
import {
   PrivateRoute,
   AdminRoute,
   LoggedUserRoute,
   TransactionRoute,
} from "./PrivateRoute";
import { AppProvider, AppContext } from "./context/AppProvider";

function App() {
   const [user, setUser] = useState({
      isAuth: false,
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      isAdmin: false,
   });

   let userCredentials = localStorage["userToken"];
   useMemo(() => {
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
   }, [userCredentials]);

   return (
      <AppContext.Provider value={[user, setUser]}>
         <Router>
            <div className="App" id="root" style={{ background: "#f0f1f1" }}>
               <AdminNavigation user={user} />
               <ToastProvider>
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/login" component={Login} />
                     <Route exact path="/logout" component={Logout} />
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/properties" component={Properties} />

                     {/* Admin Only Route */}

                     <AdminRoute path="/property-control">
                        <CreateProperty user={user} />
                     </AdminRoute>

                     <TransactionRoute path="/confirmbooking">
                        {!user.isAdmin ? (
                           <ConfirmBooking user={user} />
                        ) : (
                           <Error403 />
                        )}
                     </TransactionRoute>

                     <TransactionRoute exact path="/transactions">
                        <Transactions />
                     </TransactionRoute>

                     <PrivateRoute
                        exact
                        path="/transactions/:id"
                        component={SingleTransaction}
                        user={user}
                     />
                     {/* <SingleTransaction user={user} />
                     </Route> */}
                     <Route exact path="/sample">
                        <SingleTransaction user={user} />
                     </Route>

                     <Route exact path="/properties/:id">
                        <PropertySingle user={user} />
                     </Route>
                     <Route path="/404" component={Page404} />
                     <Route path="/403" component={Error403} />
                     <Route path="" component={Page404} />
                  </Switch>
               </ToastProvider>
               <Footer />
            </div>
         </Router>
      </AppContext.Provider>
   );
}

export default App;
