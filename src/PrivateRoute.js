import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AppContext } from "./context/AppProvider";
import Error403 from "./Pages/Error403";

export const PrivateRoute = ({ component: Component, ...rest }) => {
   const [user] = useContext(AppContext);
   // console.log(props.path.match.params);

   return (
      <Route
         {...rest}
         render={(props) =>
            user.isAuth ? <Component {...rest} {...props} /> : <Error403 />
         }
      />
   );
};

// let PrivateRoute = ({ component: ChildComponent, isLogin, ...rest}) => {
//    return <Route render={props => {
//      if (!this.props.get.isLogin) {
//          return <Redirect to="/login" />;
//      } else {
//        return <ChildComponent {...props} />
//      }
//    }} />

export const AdminRoute = (props) => {
   const [user] = useContext(AppContext);

   return <Route>{user.isAdmin ? props.children : <Error403 />}</Route>;
};
export const TransactionRoute = (props) => {
   const [user] = useContext(AppContext);

   return <Route>{user.isAuth ? props.children : <Error403 />}</Route>;
};
