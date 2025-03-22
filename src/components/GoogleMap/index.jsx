import { memo, useMemo } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { getCenter } from "geolib";

// Components
import Polygon from "~/components/GoogleMap/Polygon";
import Marker from "~/components/GoogleMap/Marker";

// Dependencies
import "./index.scss";
const DEFAULT_CENTER = { lat: 49.25307278849622, lng: -123.12095840000302 };

const GoogleMap = ({
   polygons,
   totalPlaceCount,
   placeCountsPerPolygon,
   activePlaceId,
   currentPlaceType,
   onPlaceClick,
}) => {
   

   return (
      <div className="GoogleMap">
         <Map
            mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
            defaultZoom={12}
            defaultCenter={DEFAULT_CENTER}
            gestureHandling="greedy"
            disableDefaultUI
            reuseMaps
         >
            {polygons.length > 0 && (
               <>
                  {polygons.map(({ coordinates, id }) => {
                     const paths = coordinates.map(
                        ({ latitude, longitude }) => ({
                           lat: latitude,
                           lng: longitude,
                        }),
                     );
                     return (
                        <Polygon
                           key={id}
                           id={id}
                           onToggle={onPlaceClick}
                           totalCount={totalPlaceCount}
                           count={placeCountsPerPolygon[id]}
                           paths={paths}
                        />
                     );
                  })}
                  {polygons.map(({ coordinates, id, placeName }) => {
                     return (
                        <Marker
                           key={id}
                           count={placeCountsPerPolygon[id]}
                           placeName={placeName}
                           currentPlaceType={currentPlaceType}
                           active={activePlaceId === id}
                           position={getCenter(coordinates)}
                        />
                     );
                  })}
               </>
            )}
         </Map>
      </div>
   );
};

export default memo(GoogleMap);
