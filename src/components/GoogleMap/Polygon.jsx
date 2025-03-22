import { memo } from "react";
import { Polygon as GPolygon } from "~/components/External/Polygon";

const Polygon = ({ id, paths, totalCount, count, onToggle }) => {
   const percent =
      totalCount > 0 ? (Number(count) / Number(totalCount)) * 100 : 0;
   let color = "rgba(190, 176, 162, 0.6)";

   if (percent > 10) {
      color = "rgba(166, 54, 3, 1)";
   } else if (percent > 8) {
      color = "rgba(230, 85, 13, 1)";
   } else if (percent > 6) {
      color = "rgba(253, 141, 60, 1)";
   } else if (percent > 4) {
      color = "rgba(253, 190, 133, 1)";
   }

   return (
      <GPolygon
         onClick={() => onToggle(id)}
         paths={[paths]}
         fillColor={color}
         strokeWeight={2}
         strokeColor={color}
      />
   );
};

export default memo(Polygon);
