import React, { useEffect, useState } from "react";
import FeaturedProperties from "../components/FeaturedProperties";
import Hero from "../components/Hero";
import cogoToast from "cogo-toast";
const Home = () => {
   const [properties, setProperties] = useState([]);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      if (setIsLoading) {
         cogoToast
            .loading("Loading Featured Properties For You!")
            .then(() => {
               cogoToast.info(
                  <div>
                     <div>
                        email:{" "}
                        <i>
                           <b>admin@email.com</b>
                        </i>
                     </div>
                     <div>
                        password:{" "}
                        <i>
                           <b>admin1234</b>
                        </i>
                     </div>
                     <div>
                        email:{" "}
                        <i>
                           <b>test@email.com</b>
                        </i>
                     </div>
                     <div>
                        password:{" "}
                        <i>
                           <b>test1234</b>
                        </i>
                     </div>
                     <div className="d-flex">
                        <small className="ml-auto">
                           will close in <span id="countdown1">15</span>
                        </small>
                     </div>
                  </div>,
                  {
                     position: "bottom-right",
                     heading: "Admin & Normal user Credentials",
                     hideAfter: 15,
                  }
               );
            })
            .then(() => {
               cogoToast.success("Featured Properties Successfully Loaded");
               let seconds1 = document.getElementById("countdown1").textContent;
               let countdown1 = setInterval(function () {
                  seconds1--;
                  document.getElementById("countdown1").textContent = seconds1;
                  if (seconds1 <= 0) clearInterval(countdown1);
               }, 1000);
            });
      }

      fetch("https://thehomesphereapi.herokuapp.com/properties")
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            setProperties(data.properties);
         });

      return function cleanup() {
         setProperties([]);
      };
   }, []);

   return (
      <div className="container-fluid my-5 px-5">
         <Hero properties={properties} />
         <FeaturedProperties properties={properties} />
      </div>
   );
};

export default Home;
