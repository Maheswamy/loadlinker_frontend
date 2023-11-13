import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DynamicRoutingMachine from "./Routing";
import "../../App.css";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { CircularProgress, Paper } from "@mui/material";

const Map = ({ coordinates }) => {
  console.log(coordinates);
  return (
    <Paper p={1} elevation={1} round>
      {isEmpty(coordinates) ? (
        <CircularProgress />
      ) : (
        <MapContainer
          doubleClickZoom={false}
          id="mapId"
          zoom={5}
          center={[20.5937, 78.9629]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
          /> 
          {coordinates[0] && (
            <DynamicRoutingMachine
              pick={coordinates[0]}
              drop={coordinates[1]}
            />
          )}
        </MapContainer>
      )}
    </Paper>
  );
};

export default Map;
