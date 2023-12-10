import React, { useState } from "react";
import MarketList from "./MarketList";
import { Box, Stack, Hidden } from "@mui/material";
import MarketMapList from "./MarketMapList";
import SearchMarket from "./SearchMarket";
import PaginationConatiner from "./PaginationConatiner";
import HomePageCarousel from "./../HomePageCarousel ";
import Footer from "./Footer";

const MarketContainer = () => {
  const [view, setView] = useState(true);
  const handleView = () => {
    setView(!view);
  };

  return (
    <Stack justifyContent={"center"} spacing={2}>
      <SearchMarket handleView={handleView} />
      <Hidden smDown>
        <HomePageCarousel />
      </Hidden>
      <Stack alignItems={"center"}>
        {view ? <MarketList /> : <MarketMapList />}
        <PaginationConatiner />
        <Footer />
      </Stack>
    </Stack>
  );
};

export default MarketContainer;
