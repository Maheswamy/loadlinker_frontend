import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import EnquiryDetail from "./../common/EnquiryDetail";
import Map from "./../common/Map";
import BidList from "./BidList";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startGetEnquiryBids } from "../../../redux/action/bidAction";

const SelectBidContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const enquiry = useSelector((state) =>
    state.enquiry.enquries.find((ele) => ele._id === id)
  );
  useEffect(() => {
    dispatch(startGetEnquiryBids(id, navigate));
  }, []);
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
