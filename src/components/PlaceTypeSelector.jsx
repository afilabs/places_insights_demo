import { memo } from "react";

// Dependencies
import "./PlaceTypeSelector.scss";
import { PLACE_LIST } from "~/constants";

const PlaceTypeSelector = ({ handlePlaceTypeChange }) => {
   return (
      <div className="PlaceTypeSelector">
         <h2 className="place-title">Place Types</h2>

         <ul className="place-menu">
            {PLACE_LIST.map((place, index) => {
               return (
                  <li key={place.placeType + index} className="place-item">
                     <input
                        type="radio"
                        id={place.placeType}
                        className="place-radio"
                        name="item"
                        onChange={() => handlePlaceTypeChange(place)}
                     />
                     <label className="place-text" htmlFor={place.placeType}>
                        {place.name}
                     </label>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default memo(PlaceTypeSelector);
