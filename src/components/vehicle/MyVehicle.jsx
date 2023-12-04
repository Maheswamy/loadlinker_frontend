import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import VehicleCard from "./VehicleCard";

const MyVehicle = () => {
  const vehicleList = useSelector((state) => state.vehicle.myVehicle);
  console.log(vehicleList);
  return (
    <Grid container spacing={2} justifyContent={'center'}>
      {vehicleList.length === 0 && (
        <Typography variant="h6" color="primary">
          No vehicles Found
        </Typography>
      )}
      {vehicleList.filter((ele)=>ele.delete===false).map((ele) => (
        <Grid item key={ele._id}>
          <VehicleCard {...ele} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyVehicle;
