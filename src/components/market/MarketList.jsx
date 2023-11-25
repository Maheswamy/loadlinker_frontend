import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarketItem from "./MarketItem";
import { Box, Grid } from "@mui/material";
import { startGetMarketList } from "../../redux/action/marketAction";

const MarketList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetMarketList());
  }, []);
  const marketList = useSelector((state) => state.market.marketList);
  console.log(marketList)
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
