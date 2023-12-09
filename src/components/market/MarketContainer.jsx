import React, { useState } from "react";
import MarketList from "./MarketList";
import { Box, Stack } from "@mui/material";
import MarketMapList from "./MarketMapList";
import SearchMarket from "./SearchMarket";
import PaginationConatiner from "./PaginationConatiner";
import HomePageCarousel from "./../HomePageCarousel ";

const MarketContainer = () => {
  const [currentSkip, setCurrentSkip] = useState(0);
  const [view, setView] = useState(true);
  const handleView = () => {
    setView(!view);
  };

  return (
    <Stack justifyContent={"center"} spacing={2}>
      <SearchMarket handleView={handleView} />
      <HomePageCarousel />
      <Stack alignItems={"center"}>
        {view ? <MarketList /> : <MarketMapList />}

        <PaginationConatiner />
      </Stack>
    </Stack>
  );
};

export default MarketContainer;
