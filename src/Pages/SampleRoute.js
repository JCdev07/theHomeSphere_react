import React from "react";
import { useParams } from "react-router-dom";

const SampleRoute = () => {
   const { id } = useParams();
   console.log(id);
   return <div>Sample</div>;
};

export default SampleRoute;
