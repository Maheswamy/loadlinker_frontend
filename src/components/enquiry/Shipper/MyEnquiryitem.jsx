import { Grid, Paper, Container, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startGetEnquiryBids } from "../../../redux/action/bidAction";
import { startRemoveShipperEnquiry } from "../../../redux/action/enquiryAction";

const MyEnquiryitem = ({
  amount,
  _id,
  createdAt,
  bids,
  loadType,
  loadWeight,
  pickUpLocation,
  dropOffLocation,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleShowmore = (id) => {
    dispatch(startGetEnquiryBids(id, navigate));
  };

  const handleDeleteEnquiry = () => {
    
    dispatch(startRemoveShipperEnquiry(_id))
  };

  return (
    <Container>
      <Paper style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Number of Bids
            </Typography>
            <Typography variant="subtitle1" color="text">
              {bids?.length}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Created At
            </Typography>
            <Typography variant="subtitle1" color="text">
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Load Type
            </Typography>
            <Typography variant="subtitle1" color="text">
              {loadType}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Load Weight
            </Typography>
            <Typography variant="subtitle1" color="text">
              {loadWeight}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Pick-up Location
            </Typography>
            <Typography variant="subtitle1" color="text">
              {pickUpLocation?.district}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text">
              Drop-off Location
            </Typography>
            <Typography variant="subtitle1" color="text">
              {dropOffLocation?.district}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => handleShowmore(_id)}
            >
              Show more
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteEnquiry}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyEnquiryitem;
