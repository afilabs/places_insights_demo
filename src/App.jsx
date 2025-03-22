import { useCallback, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import LoadingOverlay from "react-loading-overlay-ts";
import { HashLoader } from "react-spinners";

// Components
import PlaceTypeSelector from "~/components/PlaceTypeSelector";
import GoogleMap from "~/components/GoogleMap";

// Dependencies
import "./App.scss";
import request from "~/utils/axios";
import { POLYGONS } from "~/constants";

const AREA_INSIGHTS_URL =
   "https://areainsights.googleapis.com/v1:computeInsights";

const App = () => {
   const [isFetching, setIsFetching] = useState(false);
   const [currentPlaceType, setCurrentPlaceType] = useState(null);
   const [totalPlaceCount, setTotalPlaceCount] = useState(0);
   const [placeCountsPerPolygon, setPlaceCountsPerPolygon] = useState({});
   const [activePlaceId, setActivePlaceId] = useState(null);

   const handlePlaceTypeChange = useCallback(
      async (place) => {
         if (isFetching) return;
         setIsFetching(true);

         let totalCount = 0;
         const promises = POLYGONS.map(async ({ coordinates, id }) => {
            try {
               const response = await request(AREA_INSIGHTS_URL, {
                  method: "POST",
                  data: {
                     insights: ["INSIGHT_COUNT"],
                     filter: {
                        locationFilter: {
                           customArea: { polygon: { coordinates } },
                        },
                        typeFilter: { includedPrimaryTypes: place.placeType },
                     },
                  },
               });

               totalCount += Number(response.count);
               return [id, response.count]; // [123, "50"]
            } catch (error) {
               console.error(`Error fetching data for id ${id}:`, error);
               return [id, 0];
            }
         }); // [ [123, "50"], [456, "70"]]

         const placeCountsPerPolygon = Object.fromEntries(
            await Promise.all(promises),
         ); // {"123": 50, "456",}

         setCurrentPlaceType(place.name);
         setTotalPlaceCount(totalCount);
         setPlaceCountsPerPolygon(placeCountsPerPolygon);
         setIsFetching(false);
      },
      [isFetching],
   );

   const handlePlaceClick = (placeId) => {
      setActivePlaceId(activePlaceId !== placeId ? placeId : null);
   };

   return (
      <div className="App">
         <LoadingOverlay
            active={isFetching}
            spinner={<HashLoader color={"#36D7B7"} />}
         >
            <div className="control-panel">
               <PlaceTypeSelector
                  handlePlaceTypeChange={handlePlaceTypeChange}
               />
            </div>
            <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}>
               <GoogleMap
                  polygons={POLYGONS}
                  placeCountsPerPolygon={placeCountsPerPolygon}
                  totalPlaceCount={totalPlaceCount}
                  currentPlaceType={currentPlaceType}
                  activePlaceId={activePlaceId}
                  onPlaceClick={handlePlaceClick}
               />
            </APIProvider>
         </LoadingOverlay>
      </div>
   );
};

export default App;
