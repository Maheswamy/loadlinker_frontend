import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { isEmpty } from "lodash";

const EnquiryDetail = ({
  loadType,
  loadWeight,
  dateOfPickUp,
  pickUpLocation,
  dateOfUnload,
  dropUpLocation,
  amount,
  paymentType,
}) => {
  console.log(loadType);
  return (
    <Box>
      {isEmpty(EnquiryDetail) && (
        <Grid container spacing={5}>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" color="textSecondary">
              Load Weight:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {loadWeight} Kg
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" color="textSecondary">
              Load Type:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {loadType}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" color="textSecondary">
              Pickup Date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {new Date(dateOfPickUp).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" color="textSecondary">
              Drop Date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {new Date(dateOfUnload).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              Pickup Addess:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {pickUpLocation?.address},{pickUpLocation?.area},
              {pickUpLocation?.district} district,{pickUpLocation?.state}-
              {pickUpLocation?.pin}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary">
              Drop Addess:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {dropUpLocation?.address},{dropUpLocation?.area},
              {dropUpLocation?.district} district,{dropUpLocation?.state}-
              {dropUpLocation?.pin}
            </Typography>
          </Grid>
          {/* Add more grid items as needed */}
        </Grid>
      )}
    </Box>
  );
};

export default EnquiryDetail;
