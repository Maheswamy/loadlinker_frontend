import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import VehicleCard from "./VehicleCard";

const MyVehicle = () => {
  const vehicleList = useSelector((state) => state.vehicle.myVehicle);
  console.log(vehicleList);
  return (
    <Grid container spacing={2}>
      {vehicleList.map((ele) => (
        <Grid item key={ele._id}>
          <VehicleCard {...ele}  />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyVehicle;
