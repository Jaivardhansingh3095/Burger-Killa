import { useEffect } from "react";
import { olaMaps } from "../../services/apiMap";

function DisplayMap({ geoLoc, height = false }) {
  useEffect(
    function () {
      const myMap = olaMaps.init({
        style:
          "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: "map",
        center: [geoLoc.lng, geoLoc.lat],
        zoom: 17,
      });

      olaMaps
        .addMarker({
          offset: [0, -10],
          anchor: "bottom",
          draggable: true,
          color: "#ff7936",
        })
        .setLngLat([geoLoc.lng, geoLoc.lat])
        .addTo(myMap);
    },
    [geoLoc.lat, geoLoc.lng]
  );

  return (
    <div
      id="map"
      className={`w-full  ${height ? "h-[500px]" : "h-full"}`}
    ></div>
  );
}

export default DisplayMap;
