import React from "react";
import { useSelector } from "react-redux";
import MarketItem from "./MarketItem";
import { Grid, Stack } from "@mui/material";

const MarketList = () => {
  const marketList = useSelector((state) => state.market.marketList);
  return (
    <Stack direction="row" wrap="wrap"gap={2} >
      {marketList.map((ele) => (
        <MarketItem {...ele} key={ele._id}/>
      ))}
    </Stack>
  );
};

export default MarketList;
