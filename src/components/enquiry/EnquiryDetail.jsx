import React from "react";
import { Box, Typography } from "@mui/material";

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
  console.log(loadType)
  return (
    <Box>
      <Typography variant="h6" color="initial">
        Load Weight:
      </Typography>
      <Typography variant="h6" color="initial">
        {loadWeight}
      </Typography>
      <Typography variant="h6" color="initial">
        Load Type:
      </Typography>
      <Typography variant="h6" color="initial">
        {loadType}
      </Typography>
      <Typography variant="h6" color="initial">
        Pickup Date
      </Typography>
      <Typography variant="h6" color="initial">
        {dateOfPickUp}
      </Typography>
      <Typography variant="h6" color="initial">
        Drop Date:
      </Typography>
      <Typography variant="h6" color="initial">
        {dateOfUnload}
      </Typography>
      <Typography variant="h6" color="initial">
        Pickup Address:
      </Typography>
      <Typography variant="h6" color="initial">
        Pickup Address:
      </Typography>
      <Typography variant="h6" color="initial">
        Drop Address:
      </Typography>
      <Typography variant="h6" color="initial">
        Drop Address:
      </Typography>
      <Typography variant="h6" color="initial">
        Amount:
      </Typography>
      <Typography variant="h6" color="initial">
        {amount}
      </Typography>
      <Typography variant="h6" color="initial">
        Payment Type:
      </Typography>
      <Typography variant="h6" color="initial">
        {paymentType}
      </Typography>
      <Typography variant="h6" color="initial">
        Shipper Name:
      </Typography>
      <Typography variant="h6" color="initial">
        Shipper Name:
      </Typography>
    </Box>
  );
};

export default EnquiryDetail;
