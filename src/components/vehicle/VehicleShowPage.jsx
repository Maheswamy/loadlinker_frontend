import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StateTag from "./StateTag";
import ShowImage from "./ShowImage";

const VehicleDetail = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle1">{label}:</Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const VehicleShowPage = () => {
  const { id } = useParams();

  const {
    vehicleNumber,
    isVerified,
    loaded,
    permit,
    permittedLoadCapacity,
    rcNumber,
    rcImages,
    vehicleImages,
    vehicleType,
  } = useSelector((state) =>
    state.vehicle.myVehicle.find((ele) => ele._id === id)
  );

  const permitNameList = useSelector((state) => state.vehicle.permit);
  const vehicleTypeList = useSelector((state) => state.vehicle.vehicleType);

  const statesName = permit.map((ele) =>
    permitNameList.find((permit) => permit._id === ele)
  );
  const typeOfvehicle = vehicleTypeList.find((ele) => ele._id === vehicleType);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="space-evenly">
            <VehicleDetail label="Vehicle Number" value={vehicleNumber} />
            <VehicleDetail label="Vehicle Verification" value={isVerified} />
            <VehicleDetail
              label="Vehicle Status"
              value={loaded ? "In Shipment" : "Empty"}
            />
            <VehicleDetail
              label="Permitted Load Capacity"
              value={permittedLoadCapacity}
            />
            <VehicleDetail label="RC Number" value={rcNumber} />
            <VehicleDetail label="Category" value={typeOfvehicle?.name} />
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {statesName.map((ele) => (
              <StateTag {...ele} key={ele._id} />
            ))}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <ShowImage images={[...rcImages, ...vehicleImages]} />
      </Grid>
    </Grid>
  );
};

export default VehicleShowPage;
