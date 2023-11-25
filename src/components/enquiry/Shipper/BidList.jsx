import { Box, Grid, Select } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BidItem from "./BidItem";
import { useParams } from "react-router-dom";

const BidList = () => {
  const [sortstate, setSort] = useState("");
  const { id } = useParams();
  const bids = useSelector((state) => state.bid.enquiryBids);

  return (
    <Grid>
      <h1>bid list</h1>
      <select value={sortstate} onChange={(e) => setSort(e.target.value)}>
        <option value="">none</option>
        <option value="ascending">highest to lowest</option>
        <option value="decending">lowest to Highest</option>
      </select>

      {bids
        .sort((a, b) =>
          sortstate === "ascending" || sortstate === ""
            ? b.bidAmount - a.bidAmount
            : a.bidAmount - b.bidAmount
        )
        .map((ele) => (
          <BidItem {...ele} key={ele._id} enquiryId={id} />
        ))}
    </Grid>
  );
};

export default BidList;
