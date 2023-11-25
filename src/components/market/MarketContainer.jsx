import React from "react";
import MarketList from "./MarketList";
import { Box, Grid } from "@mui/material";
import MarketMapList from "./MarketMapList";

const MarketContainer = () => {
  
  return (
    <Box>
      <MarketList />
      <MarketMapList />
    </Box>
  );
};

export default MarketContainer;
