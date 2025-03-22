import { memo, useState, useEffect } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import pluralize from "pluralize";
import "./Marker.scss";

const InfoWindow = ({ placeName, count, currentPlaceType }) => {
   const description = `${count} ${pluralize(currentPlaceType, count)} in this neighbourhood`;

   return (
      <div className="info-window">
         <div className="title">{placeName}</div>
         <span className="description">
            <b>{description}</b>
         </span>
      </div>
   );
};

const Marker = ({ position, active, count, currentPlaceType, placeName }) => {
   const [showInfoWindow, setShowInfoWindow] = useState(active);

   useEffect(() => {
      setShowInfoWindow(active);
   }, [active]);

   if (!currentPlaceType) {
      return null;
   }

   const { latitude, longitude } = position;

   return (
      <AdvancedMarker
         className="Marker"
         position={{ lat: latitude, lng: longitude }}
      >
         {showInfoWindow && (
            <InfoWindow
               placeName={placeName}
               count={count}
               currentPlaceType={currentPlaceType}
            />
         )}
      </AdvancedMarker>
   );
};

export default memo(Marker);
