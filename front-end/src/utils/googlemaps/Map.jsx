import { useCallback } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const libraries = ["places"];
export function StageMap({ markerLocation }) {
  // Ensure the API is loaded
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    // You can do things with the map here
    console.log("Map loaded", map);
  }, []);

  const onUnmount = useCallback((map) => {
    // Cleanup map if necessary
    console.log("Map unmounted", map);
  }, []);
  return (
    isLoaded && (
      <div style={{ width: "100%", height: "500px" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={markerLocation}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={markerLocation} />
        </GoogleMap>
      </div>
    )
  );
}
