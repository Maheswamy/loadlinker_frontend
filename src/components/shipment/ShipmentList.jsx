import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShipmentItem from "./ShipmentItem";
import { Grid, Stack, Typography } from "@mui/material";
import { startGetAllMyShipments } from "../../redux/action/shipmentAction";

const ShipmentList = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(startGetAllMyShipments());
  }, []);
  const myShipments = useSelector((state) => state.shipment.myShipments);

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
            <Stack item key={ele._id} sx={{ maxWidth: "lg" }}>
              <ShipmentItem {...ele} />
            </Stack>
          ))}
        </>
      )}
    </Grid>
  );
};

export default ShipmentList;
