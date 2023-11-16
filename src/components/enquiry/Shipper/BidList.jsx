import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import BidItem from "./BidItem";
import { useParams } from "react-router-dom";

const BidList = () => {
  const { id } = useParams();
  const bids = useSelector((state) => state.bid.enquiryBids);
  console.log(bids);

  return (
    <Grid>
      <h1>bid list</h1>
      {bids.map((ele) => (
        <BidItem {...ele} key={ele._id} enquiryId={id} />
      ))}
    </Grid>
  );
};

export default BidList;
