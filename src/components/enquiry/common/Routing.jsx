// Importing necessary modules and libraries
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useDispatch } from "react-redux";
import { newCalculationCoordinates } from "../../../redux/action/enquiryAction";

const createRoutineMachineLayer = ({ pick, drop, drag, onWaypointsDrag }) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(pick[1], pick[0]), L.latLng(drop[1], drop[0])],
    lineOptions: {
      styles: [{ color: "#FF4000", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: drag,
    draggableWaypoints: drag,
    fitSelectedRoutes: true,
    showAlternatives: true,
    routeInstructionsContainer: "",
  });

  // Event handler for when a route is selected
  instance.on("routeselected", function (e) {
    onWaypointsDrag(e.route.waypoints);
  });

  // Returning the created instance
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Functional component for a dynamic routing machine
const DynamicRoutingMachine = ({ pick, drop, drag }) => {
  const ref = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current) {
      ref.current
        .getPlan()
        .setWaypoints([L.latLng(pick[0], pick[1]), L.latLng(drop[0], drop[1])]);
    }
  }, [pick, drop]);

  const handleWaypointsDrag = (waypoints) => {
    const [source, distination] = waypoints;

    dispatch(
      newCalculationCoordinates({
        source: source.latLng,
        distination: distination.latLng,
      })
    );
  };

  return (
    <RoutingMachine
      ref={ref}
      pick={pick}
      drop={drop}
      drag={drag}
      onWaypointsDrag={handleWaypointsDrag}
    />
  );
};

// Exporting the DynamicRoutingMachine component as the default export
export default DynamicRoutingMachine;
