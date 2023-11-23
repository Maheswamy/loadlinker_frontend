import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DynamicRoutingMachine from "./Routing";
import "../../../App.css";
import { Paper } from "@mui/material";
import { useSelector } from 'react-redux';

const Map = ({ coordinates, drag }) => {
  const styles = {
    paper: {
      maxHeight: "80vh",
      overflow: "hidden",
    },
  };


  return (
    <Paper p={1} elevation={1} round style={styles.paper}>
      {coordinates && (
        <MapContainer
          doubleClickZoom={false}
          id="mapId"
          zoom={6}
          center={[20.5937, 78.9629]}
        >
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
          />
          {coordinates[0] && (
            <DynamicRoutingMachine
              pick={coordinates[0]}
              drop={coordinates[1]}
              drag={drag}
            />
          )}
        </MapContainer>
      )}
    </Paper>
  );
};

export default Map;
