import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const MarketMapList = ({ position }) => {
  function icon(iconSize) {
    return L.icon({
      iconUrl:
        "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-truck.gif",
      iconSize: [iconSize],
    });
  }
  return (
    <>
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={6}
        style={{ height: "400px", width: "100%" }}
        center={position.length > 0 ? position : [20.5937, 78.9629]}
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
        />
        {position.length > 0 && (
          <Marker position={position} icon={icon(50)}></Marker>
        )}
      </MapContainer>
    </>
  );
};

export default MarketMapList;
