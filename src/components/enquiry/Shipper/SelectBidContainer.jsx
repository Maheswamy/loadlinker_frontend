import { Grid } from "@mui/material";
import React from "react";
import EnquiryDetail from "./../common/EnquiryDetail";
import Map from "./../common/Map";
import BidList from "./BidList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SelectBidContainer = () => {
  const { id } = useParams();
  const enquiry = useSelector((state) =>
    state.enquiry.enquries.find((ele) => ele._id === id)
  );

  const coordinatesObj = enquiry?.coordinates;

  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Map coordinates={coordinates} drag={false} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EnquiryDetail {...enquiry} />
          <BidList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectBidContainer;
