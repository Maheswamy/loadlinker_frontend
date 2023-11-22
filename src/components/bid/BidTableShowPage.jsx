import { Box, Grid, CircularProgress, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Map from "./../enquiry/common/Map";
import EnquiryDetail from "./../enquiry/common/EnquiryDetail";
import { isEmpty } from "lodash";
import { startRemoveMyBid } from "./../../redux/action/bidAction";
import {
  startGetSingleBidDetails,
  clearSingleBidDetails,
} from "../../redux/action/bidAction";

const BidTableShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateBack = () => {
    
    navigate("/mybids",{state:{message:'your bid is deleted'}});
  };
  const handleRemoveBid = () => {
    dispatch(startRemoveMyBid(id, navigateBack));
  };

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
          gap={3}
          display={"flex"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {isEmpty(enquiryId) ? (
            <CircularProgress />
          ) : (
            <>
              <EnquiryDetail
                {...enquiryId}
                bidAmount={bidAmount}
                status={status}
                vehicleNumber={vehicleNumber?.vehicleNumber}
              />
              {status==='active'&&<Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRemoveBid}
              >
                Cancel Bid
              </Button>}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default BidTableShowPage;
