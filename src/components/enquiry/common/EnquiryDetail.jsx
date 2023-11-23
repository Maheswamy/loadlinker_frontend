import React from "react";
import {  Typography, Grid } from "@mui/material";
import { isEmpty } from "lodash";

const EnquiryDetail = ({
  loadType,
  loadWeight,
  dateOfPickUp,
  pickUpLocation,
  dateOfUnload,
  dropOffLocation,
  amount,
  paymentType,
  bidAmount,
  vehicleNumber,
  status,
}) => {
  return (
    <>
      {isEmpty(EnquiryDetail) && (
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              Load Weight:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {loadWeight} Kg
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              Load Type:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {loadType}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              PaymentType:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {paymentType}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              Pickup Date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {new Date(dateOfPickUp).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              Drop Date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {new Date(dateOfUnload).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="textSecondary">
              Amount:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {amount}
            </Typography>
          </Grid>
          {bidAmount && (
            <Grid item xs={12} md={4}>
              <Typography variant="body1" color="textSecondary">
                Your Bid amount:
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {bidAmount}
              </Typography>
            </Grid>
          )}
          {status && (
            <Grid item xs={12} md={4}>
              <Typography variant="body1" color="textSecondary">
                status:
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {status}
              </Typography>
            </Grid>
          )}
          {vehicleNumber && (
            <Grid item xs={12} md={4}>
              <Typography variant="body1" color="textSecondary">
                vehicel Number:
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {vehicleNumber}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              Pickup Address:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {pickUpLocation?.address},{pickUpLocation?.area},
              {pickUpLocation?.district} ,{pickUpLocation?.state}-
              {pickUpLocation?.pin}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="textSecondary">
              Drop Address:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {dropOffLocation?.address},{dropOffLocation?.area},
              {dropOffLocation?.district} ,{dropOffLocation?.state}-
              {dropOffLocation?.pin}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EnquiryDetail;
