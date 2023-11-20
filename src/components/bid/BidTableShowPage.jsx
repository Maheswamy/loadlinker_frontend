import { Box, Grid, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Map from "./../enquiry/common/Map";
import EnquiryDetail from "./../enquiry/common/EnquiryDetail";
import { isEmpty } from "lodash";
import {
  startGetSingleBidDetails,
  clearSingleBidDetails,
} from "../../redux/action/bidAction";

const BidTableShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  useEffect(() => {
    dispatch(startGetSingleBidDetails(id));
    return () => dispatch(clearSingleBidDetails());
  }, []);

  const {
    bidAmount,
    enquiryId = {},
    status,
    vehicleId,
  } = useSelector((state) => state.bid.singleBid);
  console.log(vehicleId);

  const vehicleNumber = useSelector((state) =>
    state.vehicle?.myVehicle?.find((ele) => ele._id === vehicleId)
  );

  const coordinatesObj = enquiryId.coordinates;
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} p={2} component={"Paper"} elevation={5} round>
          <Map coordinates={coordinates} drag={false} />
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {isEmpty(enquiryId) ? (
            <CircularProgress />
          ) : (
            <EnquiryDetail
              {...enquiryId}
              bidAmount={bidAmount}
              status={status}
              vehicleNumber={vehicleNumber?.vehicleNumber}
            />
          )}
        </Grid>
      </Grid>
      <h1>show page</h1>
    </>
  );
};

export default BidTableShowPage;
