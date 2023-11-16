import React from "react";
import { useSelector } from "react-redux";
import ShipmentItem from "./ShipmentItem";
import { Grid } from '@mui/material';

const ShipmentList = () => {

    const myShipments=useSelector((state)=>state.shipment.myShipments)
    console.log(myShipments)
  return (
    <Grid container gap={2}>
      {myShipments?.map((ele)=><ShipmentItem {...ele} key={ele._id}/>)}
    </Grid>
  );
};

export default ShipmentList;
