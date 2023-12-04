import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StateTag from "./StateTag";
import ImageModal from "./../admin/vehicleApproval/ImageModal";
import { startRemoveVehicle } from "../../redux/action/vehicleAction";

const VehicleDetail = ({ label, value }) => (
  <Stack direction={"row"} alignItems={"center"}>
    <Typography variant="subtitle1">{label}:</Typography>
    <Typography variant="body1">{value}</Typography>
  </Stack>
);

const VehicleShowPage = () => {
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModal = (value) => {
    setOpen(value);
  };

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
    reasonForRejection,
  } = useSelector((state) =>
    state.vehicle.myVehicle.find((ele) => ele._id === id)
  );

  const handleSpinner = (value) => {
    setSpinner(value);
  };

  const permitNameList = useSelector((state) => state.vehicle.permit);
  const vehicleTypeList = useSelector((state) => state.vehicle.vehicleType);

  const statesName = permit.map((ele) =>
    permitNameList.find((permit) => permit._id === ele)
  );
  const typeOfvehicle = vehicleTypeList.find((ele) => ele._id === vehicleType);

  const handleDeleteVehicle = () => {
    const result = window.confirm("Do you really want to remove your vehicle?");

    if (result) {
      handleSpinner(true);
      dispatch(startRemoveVehicle({ id, navigate, handleSpinner }));
    }
  };

  return (
    <Stack direction="column" spacing={2} justifyContent="space-evenly">
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          flexWrap={"wrap"}
          justifyContent="space-around"
        >
          <Stack spacing={3}>
            <VehicleDetail label="Vehicle Number" value={vehicleNumber} />
            <VehicleDetail label="Vehicle Verification" value={isVerified} />
            <VehicleDetail
              label="Vehicle Status"
              value={loaded ? "In Shipment" : "Empty"}
            />
          </Stack>
          <Stack spacing={3}>
            <VehicleDetail
              label="Permitted Load Capacity"
              value={permittedLoadCapacity}
            />
            <VehicleDetail label="RC Number" value={rcNumber} />
            <VehicleDetail label="Category" value={typeOfvehicle?.name} />
          </Stack>
        </Stack>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="body1" color="initial">
          Permits:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
          {statesName.map((ele) => (
            <StateTag {...ele} key={ele?._id} />
          ))}
        </Stack>
      </Paper>
      <Paper>
        {reasonForRejection && (
          <Stack
            direction={"row"}
            my={3}
            alignitem={"center"}
            justifyContent={"center"}
          >
            <Typography variant="body1" color="initial">
              Reason for Rejection:
            </Typography>
            <Typography variant="body1" color="primary">
              {reasonForRejection}
            </Typography>
          </Stack>
        )}
      </Paper>
      <Stack justifyContent={"center"} alignItems={"center"}>
        {spinner ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleModal(true);
            }}
            fullWidth
          >
            View Documents and Vehicle Images
          </Button>
        )}
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        {spinner ? (
          <CircularProgress />
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteVehicle}
            fullWidth
          >
            Delete My Vehicle
          </Button>
        )}
      </Stack>
      <ImageModal
        open={open}
        setOpen={handleModal}
        images={[...rcImages, ...vehicleImages]}
      />
    </Stack>
  );
};

export default VehicleShowPage;
