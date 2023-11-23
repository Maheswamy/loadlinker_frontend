// Importing necessary modules and libraries
import React, { useEffect, useRef } from "react";
import L, { latLng } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useDispatch, useSelector } from "react-redux";
import { newCalculationCoordinates } from "../../../redux/action/enquiryAction";
import { isEqual } from "lodash";

const createRoutineMachineLayer = ({
  pick,
  drop,
  drag,

  onWaypointsDrag,
  enquiryCalculation,
}) => {
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
    const [x, y] = e.route.inputWaypoints;
    const [a, b] = e.route.waypoints;
    console.log(e.route.waypoints, pick);
    const oldSource = Object.values(Object.values(x)[1])
    const oldDestination = Object.values(Object.values(y)[1])
    
    const newSource = Object.values(Object.values(a)[1])
    const newDestination = Object.values(Object.values(b)[1])
    console.log(oldSource, newSource, oldDestination, newDestination, "hooooo");
    console.log(
      isEqual(oldSource, newSource) && isEqual(oldDestination, newDestination),
      "jagdjh"
    );
    if (
      isEqual(oldSource, newSource) &&
      isEqual(oldDestination, newDestination)
    ) {
      console.log("no changes");
    } else {
      onWaypointsDrag(e.route.waypoints);
    }
  });

  // Returning the created instance
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Functional component for a dynamic routing machine
const DynamicRoutingMachine = ({ pick, drop, drag, enquiryCalculation }) => {
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
    console.log(waypoints);
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
