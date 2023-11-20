import React from "react";
import { useSelector } from "react-redux";
import ShipmentItem from "./ShipmentItem";
import { Grid, Stack, Typography } from "@mui/material";

const ShipmentList = () => {
  const myShipments = useSelector((state) => state.shipment.myShipments);
  console.log(myShipments);
  return (
    <Grid
      container
      gap={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      minWidth={"auto"}
    >
      {myShipments.length == 0 ? (
        <Typography variant="h5" color="primary">
          no shipments founds
        </Typography>
      ) : (
        <>
          {myShipments?.map((ele) => (
            <Stack item key={ele._id} sx={{ maxWidth: "lg" }} >
              <ShipmentItem {...ele} />
            </Stack>
          ))}
        </>
      )}
    </Grid>
  );
};

export default ShipmentList;
