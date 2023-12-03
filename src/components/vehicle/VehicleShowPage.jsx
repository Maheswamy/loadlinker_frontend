import React, { useState } from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StateTag from "./StateTag";
import ImageModal from "./../admin/vehicleApproval/ImageModal";

const VehicleDetail = ({ label, value }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Typography variant="subtitle1">{label}:</Typography>
    <Typography variant="body1">{value}</Typography>
  </Stack>
);

const VehicleShowPage = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleModal = (value) => {
    setOpen(value);
  };

  const {
    _id,
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

  const handleDeleteVehicle = () => {
    console.log(_id);
  };

  return (
    <Stack direction="column" spacing={2} justifyContent="space-evenly">
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          flexWrap={"wrap"}
          spacing={10}
          justifyContent="space-evenly"
          rowGap={12}
        >
          <Box>
            <VehicleDetail label="Vehicle Number" value={vehicleNumber} />
            <VehicleDetail label="Vehicle Verification" value={isVerified} />
            <VehicleDetail
              label="Vehicle Status"
              value={loaded ? "In Shipment" : "Empty"}
            />
          </Box>
          <Box>
            <VehicleDetail
              label="Permitted Load Capacity"
              value={permittedLoadCapacity}
            />
            <VehicleDetail label="RC Number" value={rcNumber} />
            <VehicleDetail label="Category" value={typeOfvehicle?.name} />
          </Box>
        </Stack>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="body1" color="initial">
          Permits:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
          {statesName.map((ele) => (
            <StateTag {...ele} key={ele._id} />
          ))}
        </Stack>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleModal(true);
        }}
      >
        View Documents and Vehicle Images
      </Button>
      <Button variant="outlined" color="error" onClick={handleDeleteVehicle}>
        Delete My Vehicle
      </Button>
      <ImageModal
        open={open}
        setOpen={handleModal}
        images={[...rcImages, ...vehicleImages]}
      />
    </Stack>
  );
};

export default VehicleShowPage;
