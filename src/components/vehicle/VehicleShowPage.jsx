import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StateTag from "./StateTag";
import ShowImage from "./ShowImage";

const VehicleShowPage = () => {
  const { id } = useParams();
  
  const {
    vehicleNumber,
    isVerified,
    loaded,
    permit,
    permittedLoadCapacity,
    rcNumber,
    rcImages,
    vehicleImages,
  } = useSelector((state) =>
    state.vehicle.myVehicle.find((ele) => ele._id === id)
  );

  const permitNameList = useSelector((state) => state.vehicle.permit);
  const statesName = permit.map((ele) =>
    permitNameList.find((per) => per._id === ele)
  );
  return (
    <Grid>
      <Box>
        <Stack direction={"row"} spacing={2} justifyContent={"space-evenly"}>
          <Box>
            <Typography variant="subtitle1">Vehicle Number:</Typography>
            <Typography variant="body1">{vehicleNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Vehicle verification:</Typography>
            <Typography variant="body1">{isVerified}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Vehicle Status:</Typography>
            <Typography variant="body1">
              {loaded ? "In Shipment" : "Empty"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              Permitted Load Capacity:
            </Typography>
            <Typography variant="body1">{permittedLoadCapacity}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">RC Number:</Typography>
            <Typography variant="body1">{rcNumber}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap={"wrap"} rowGap={1}>
          {statesName.map((ele) => (
            <StateTag {...ele} key={ele._id} />
          ))}
        </Stack>
      </Box>
      <ShowImage images={[...rcImages, ...vehicleImages]} />
    </Grid>
  );
};

export default VehicleShowPage;
