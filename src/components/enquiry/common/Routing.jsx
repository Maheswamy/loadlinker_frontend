// Importing necessary modules and libraries
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useDispatch } from "react-redux";
import { newCalculationCoordinates } from "../../../redux/action/enquiryAction";

// Function to create a routing machine layer based on provided pick, drop, role, and callback for waypoints drag
const createRoutineMachineLayer = ({ pick, drop, drag, onWaypointsDrag }) => {
  // Creating a new instance of the Leaflet Routing control
  const instance = L.Routing.control({
    // Setting initial waypoints based on pick and drop locations
    waypoints: [L.latLng(pick[1], pick[0]), L.latLng(drop[1], drop[0])],
    // Styling options for the route line
    lineOptions: {
      styles: [{ color: "#FF4000", weight: 4 }],
    },
    // Hiding the routing control initially
    show: false,
    // Allowing/disallowing adding waypoints based on the user's role
    addWaypoints: false,
    // Enabling/disabling route dragging while the mouse is down
    routeWhileDragging: drag,
    // Enabling/disabling draggable waypoints based on the user's role
    draggableWaypoints: drag,
    // Automatically fitting the map to the selected routes
    fitSelectedRoutes: true,
    // Displaying alternative routes
    showAlternatives: true,
    // Container to display route instructions
    routeInstructionsContainer: "",
  });

  // Event handler for when a route is selected
  instance.on("routeselected", function (e) {
    // Calling the provided callback with the dragged waypoints
    onWaypointsDrag(e.route.waypoints);
  });

  // Returning the created instance
  return instance;
};

// Creating a React control component based on the routing machine layer
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Functional component for a dynamic routing machine
const DynamicRoutingMachine = ({ pick, drop,drag }) => {
  // Creating a ref to access and modify the routing machine instance
  const ref = useRef();

  const dispatch = useDispatch();

  // Effect to update waypoints when pick or drop locations change
  useEffect(() => {
    if (ref.current) {
      ref.current
        .getPlan()
        .setWaypoints([L.latLng(pick[1], pick[0]), L.latLng(drop[1], drop[0])]);
    }
  }, [pick, drop]);

  // Callback function for handling dragged waypoints
  const handleWaypointsDrag = (waypoints) => {
    const [source, distination] = waypoints;
    console.log(source.latLng, distination.latLng);
    dispatch(
      newCalculationCoordinates({
        source: source.latLng,
        distination: distination.latLng,
      })
    );
  };

  // Rendering the RoutingMachine component with the provided props
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
