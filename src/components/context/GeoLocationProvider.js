import React, { createContext, useState, useEffect } from "react";

export const GeoLocationContext = createContext();

const israelCenter = [31.5, 34.65];

export const GeoLocationProvider = ({ children }) => {
  const [mapCenter, setMapCenter] = useState(israelCenter);
  const [mapZoom, setMapZoom] = useState(7);
  const [locationsCenter, setLocationsCenter] = useState(israelCenter);
  function successCurrentLocation(position) {
    setMapCenter([position.coords.latitude, position.coords.longitude]);
    setLocationsCenter([position.coords.latitude, position.coords.longitude]);
    setMapZoom(11);
  }
  function errorCurrentLocation() {
    console.log("error");
  }
  function setCenterToCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      successCurrentLocation,
      errorCurrentLocation,
      {
        enableHighAccuracy: true,
      }
    );
  }

  useEffect(() => {
    setTimeout(setCenterToCurrentLocation, 2000);
  },[])

  return (
    <GeoLocationContext.Provider
      value={{
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        setCenterToCurrentLocation,
        locationsCenter,
        setLocationsCenter
      }}
    >
      {children}
    </GeoLocationContext.Provider>
  );
};
