import React, { useState, useMemo } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   NavLink,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";

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
import UserNavigation from "./Components/UserNavigation";

function App() {
   const [user, setUser] = useState(null);

   const value = useMemo(() => ({ user, setUser }), [user, setUser]);

   return (
      <Router>
         <UserNavigation />

         <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/properties" component={Properties} />
                  <Route
                     exact
                     path="/properties/:id"
                     component={PropertySingle}
                  />
                  <Route exact path="/transactions" component={Transactions} />
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
               </Switch>
            </UserContext.Provider>
         </div>
      </Router>
   );
}

export default App;
