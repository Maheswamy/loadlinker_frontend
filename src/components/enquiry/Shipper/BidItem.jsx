import { Paper, Typography, Button,Grid } from "@mui/material";
import React from "react";

const BidItem = ({ bidAmount, vehicleId, userId }) => {
  console.log(bidAmount, vehicleId);
  return (
    <Paper style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="initial">
            Bid Amount:
          </Typography>
          <Typography variant="subtitle1" color="text">
            {bidAmount}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="initial">
            Vehicle Number:
          </Typography>
          <Typography variant="subtitle1" color="text">
            {vehicleId.vehicleNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="initial">
            Vehicle Owner:
          </Typography>
          <Typography variant="subtitle1" color="text">
            {userId.firstName} {userId.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" color="initial">
            Mobile Number:
          </Typography>
          <Typography variant="subtitle1" color="text">
            {userId.mobileNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" color="primary">
            Accept
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BidItem;
