import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Grid, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const EnquiryApproval = ({
  distance,
  amount,
  vehicleTypeId,
  handleEnquirySubmit,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const vehicleInfo = useSelector((state) =>
    state.vehicle.vehicleType.find((ele) => ele._id === vehicleTypeId)
  );

  return (
    <Grid container item xs={12}>
      <Grid
        container
        item
        sx={12}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid item justifyContent={"space-evenly"}>
          <Typography variant="body1" color="initial">
            Distance:{Math?.round(distance.distance)} kms
          </Typography>
          <Typography variant="body1" color="initial">
            Amount:{amount}
          </Typography>
          <Typography variant="body1" color="initial">
            Type of vehicle for your load :{vehicleInfo.name}
          </Typography>
          <Typography variant="body1" color="initial">
            maximum load capacity of vehicle is :{vehicleInfo.maximumWeight} kg
          </Typography>
          <Typography variant="body1" color="info">
            Payment is be done after shipment is loaded to Vehicle
          </Typography>
          <Typography variant="subtitle1" color="info">
            Pin functionality allows for precise location selection through
            drag-and-drop, ensuring accuracy in both delivery and pick-up
            points.
          </Typography>
        </Grid>
        <Grid item sx={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={startDate}
                onChange={(value) => setStartDate(value)}
                label="Pickup date"
                sx={{ backgroundColor: "white" }}
                disablePast
                fullWidth
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={endDate}
                onChange={(value) => setEndDate(value)}
                label="Drop date"
                sx={{ backgroundColor: "white" }}
                disablePast
                fullWidth
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          onClick={() => handleEnquirySubmit(startDate, endDate)}
        >
          Submit Enquiry
        </Button>
      </Grid>
    </Grid>
  );
};

export default EnquiryApproval;