import React, { useState } from "react";
import MarketList from "./MarketList";
import { Box } from "@mui/material";
import MarketMapList from "./MarketMapList";
import SearchMarket from "./SearchMarket";
import PaginationConatiner from "./PaginationConatiner";

const MarketContainer = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const [view, setView] = useState(true);
  const handleView = () => {
    setView(!view);
  };

  return (
    <Box>
      <SearchMarket handleView={handleView} />
      {view ? <MarketList /> : <MarketMapList />}

      <PaginationConatiner />
    </Box>
  );
};

export default MarketContainer;
