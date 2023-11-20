import React from "react";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShipmentItem = ({ bidId, enquiryId, status,_id }) => {
    const navigate=useNavigate()
    const handleShowMore=()=>{
    console.log(_id)
    navigate(`/shipment/${_id}`)
    }
  return (
    <Paper style={{ padding: "20px" }}>
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Vehicle Number:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {bidId.vehicleId.vehicleNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Bid Own Amount:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {bidId.bidAmount}
          </Typography>
        </Grid>
        
        {/* <Grid item>
          <Typography variant="body1" color="textSecondary">
            Enquiry Amount:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {enquiryId.amount}
          </Typography>
        </Grid> */}
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Pick-Up date:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {new Date(enquiryId.dateOfPickUp).toLocaleDateString()}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Typography variant="body1" color="textSecondary">
            Drop-off date:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {new Date(enquiryId.dateOfUnload).toLocaleDateString()}
          </Typography>
        </Grid> */}
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Source:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {enquiryId.pickUpLocation.area},{enquiryId.pickUpLocation.district}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Destination:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {enquiryId.dropUpLocation.area},{enquiryId.dropUpLocation.district}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Status:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {status}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Button variant="contained" color="primary">
            Cancel Shipment
          </Button>
        </Grid> */}
        <Grid item>
          <Button variant="outlined" color="primary" type="button" onClick={handleShowMore}>
            Show more
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ShipmentItem;
