import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";

const Home = () => {
   const { user, setUser } = useContext(UserContext);
   let userCredentials = localStorage["userToken"];
   console.log(userCredentials, user);
   return (
      <div>
         <h1>Home</h1>
         <pre></pre>

         <button>Login</button>
      </div>
   );
};

export default Home;
