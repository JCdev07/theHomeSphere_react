import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const Map = () => {
   const [mapStat, setMapStat] = useState({
      viewport: {
         width: 400,
         height: 400,
         latitude: 37.7577,
         longitude: -122.4376,
         zoom: 8,
      },
   });
   return (
      <>
         <ReactMapGL
            {...mapStat.viewport}
            mapboxApiAccessToken={"AIzaSyDvYso2Vq7yTW9Sc-peLxrB_1Ijie5o_Ms"}
            onViewportChange={(viewport) => setMapStat({ viewport })}
         />
      </>
   );
};

export default Map;
