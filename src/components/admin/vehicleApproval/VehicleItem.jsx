import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  Box,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startUpdateVehicle } from "../../../redux/action/vehicleAction";
import ImageModal from "./ImageModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #FF4000",
  boxShadow: 24,
  p: 4,
};

const VehicleItem = ({
  _id,
  vehicleNumber,
  rcNumber,
  permittedLoadCapacity,
  ownerId,
  isVerified,
  showToastMessage,
  vehicleImages,
  rcImages,
}) => {
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const [rcOpen, setRcOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [reasonForRejection, setRejection] = useState("");
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const approveVehicle = () => {
    const formData = {
      isVerified: "approved",
    };
    setSpinner(true);

    dispatch(
      startUpdateVehicle({ vehicleId: _id, formData, showToastMessage })
    );
  };

  const rejectVehicle = () => {
    const formData = {
      isVerified: "reject",
      reasonForRejection,
    };
    setSpinner(false);
    dispatch(
      startUpdateVehicle({ vehicleId: _id, formData, showToastMessage })
    );
  };

  const handleRcModal = (value) => {
    setRcOpen(value);
  };

  const handleVehicleModal = (value) => {
    setVehicleOpen(value);
  };

  return (
    <Box>
      {spinner ? (
        <CircularProgress />
      ) : (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={3}>
                {" "}
                <TextField
                  id="reasonForRejection"
                  multiline
                  fullWidth
                  label="Reason for  Rejection"
                  value={reasonForRejection}
                  onChange={(e) => setRejection(e.target.value)}
                  gutterBottom={true}
                />
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={rejectVehicle}
                >
                  Reject
                </Button>
              </Stack>
            </Box>
          </Modal>
          <ImageModal open={rcOpen} setOpen={handleRcModal} images={rcImages} />
          <ImageModal
            open={vehicleOpen}
            setOpen={handleVehicleModal}
            images={vehicleImages}
          />

          <Paper sx={{ padding: "20px" }}>
            <Stack direction={"column"} spacing={3}>
              <Stack direction={"row"} justifyContent={"space-evenly"}>
                <Typography variant="body1" color="text">
                  Vehicle Number: {vehicleNumber}
                </Typography>
                <Typography variant="body1" color="text">
                  RC Number: {rcNumber}
                </Typography>
                <Typography variant="body1" color="text">
                  Load Capacity: {permittedLoadCapacity}
                </Typography>
                <Typography variant="body1" color="text">
                  Owner Name: {ownerId.firstName} {ownerId.lastName}
                </Typography>
                <Typography variant="body1" color="text">
                  verification: {isVerified}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setRcOpen(true)}
                >
                  RC Images
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setVehicleOpen(true)}
                >
                  Vehicle Images
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={approveVehicle}
                >
                  Approve
                </Button>
                <Button variant="contained" color="error" onClick={handleOpen}>
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default VehicleItem;
