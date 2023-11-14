import React from "react";
import { useSelector } from "react-redux";
import MarketItem from "./MarketItem";
import { Box, Grid } from "@mui/material";

const MarketList = () => {
  const marketList = useSelector((state) => state.market.marketList);
  return (
    <Grid container spacing={2}>
      {marketList.map((ele) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={ele._id}>
          <MarketItem {...ele} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MarketList;
