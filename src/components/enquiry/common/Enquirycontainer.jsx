import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EnquiryDetail from "./EnquiryDetail";
import { useDispatch, useSelector } from "react-redux";
import { startGetSingleEnquiry } from "../../../redux/action/marketAction";
import BidForm from "../owner/BidForm";
import { jwtDecode } from "jwt-decode";
import Map from "./Map";


const Enquirycontainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetSingleEnquiry(id));
  }, []);
  const enquiry = useSelector((state) => state.market.singleEnquiry);
  console.log(enquiry);
  const coordinatesObj = enquiry.coordinates;
  console.log(coordinatesObj);
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];
  return (
    <Box maxHeight={"91vh"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} p={2} component={"Paper"} elevation={5} round>
          <Map coordinates={coordinates} drag={false}/>
        </Grid>

        <Grid item xs={12} md={5}>
          <EnquiryDetail {...enquiry} />
          {jwtDecode(localStorage.getItem("token"))?.role === "owner" && (
            <BidForm id={id} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Enquirycontainer;
