import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import BidTable from './BidTable'
import { useDispatch } from "react-redux";
import { startGetMyBid } from "../../redux/action/bidAction";

const BidContainer = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(startGetMyBid())
  },[])
  return (
    <Grid>
        <BidTable/>
    </Grid>
  );
};

export default BidContainer;
