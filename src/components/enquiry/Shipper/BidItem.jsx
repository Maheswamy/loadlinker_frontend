import { Paper, Typography, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { startApproveBid } from "../../../redux/action/shipmentAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BidItem = ({ bidAmount, vehicleId, userId, _id, enquiryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleBidApprove = () => {
    const bidId = _id;
    dispatch(startApproveBid(bidId, enquiryId,navigate));
  };
  
  return (
    <Paper style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Bid Amount:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {bidAmount}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Vehicle Number:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {vehicleId.vehicleNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Vehicle Owner:
          </Typography>
          <Typography variant="subtitle1" color="textPrimary">
            {userId.firstName} {userId.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Mobile Number:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {userId.mobileNumber}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBidApprove}
          >
            Accept
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BidItem;
