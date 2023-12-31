import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EnquiryDetail from "./EnquiryDetail";
import { useDispatch, useSelector } from "react-redux";
import { startGetSingleEnquiry } from "../../../redux/action/marketAction";
import BidForm from "../owner/BidForm";
import { jwtDecode } from "jwt-decode";
import Map from "./Map";

const EnquiryContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetSingleEnquiry(id));
  }, []);
  const enquiry = useSelector((state) => state.market.singleEnquiry);
  const coordinatesObj = enquiry.coordinates;
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];
  return (
    <Box maxHeight={"91vh"}>
      <Stack container spacing={2}>
        <Box  xs={12} md={5}>
          {<EnquiryDetail {...enquiry} />}
          {jwtDecode(localStorage.getItem("token"))?.role === "owner" && (
            <BidForm id={id} {...enquiry} />
          )}
        </Box>
        <Grid item xs={12} md={7} p={2} component={"Paper"} elevation={5} round>
          <Map coordinates={coordinates} drag={false} />
        </Grid>
      </Stack>
    </Box>
  );
};

export default EnquiryContainer;
