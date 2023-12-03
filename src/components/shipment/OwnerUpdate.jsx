import React from "react";
import { Button, Typography, Stack, Paper, Rating } from "@mui/material";
import { startUpdateShipment } from "./../../redux/action/shipmentAction";
import { useDispatch } from "react-redux";

const OwnerUpdate = ({ status, shipmentId, review }) => {
  const dispatch = useDispatch();
  const handleLoad = (status) => {
    console.log(status, shipmentId);
    dispatch(startUpdateShipment({ status }, shipmentId));
  };
  return (
    <div>
      {status === "waiting" && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => handleLoad("loaded")}
        >
          Loaded
        </Button>
      )}
      {status === "loaded" && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => handleLoad("unloaded")}
        >
          Unloaded
        </Button>
      )}
      {status === "unloaded" && (
        <Typography variant="h6" color="primary">
          Shipment delivered
        </Typography>
      )}
      {review && (
        <Paper sx={{ marginTop: "20px", padding: "20px" }}>
          <Stack spacing={3}>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="body1" color="initial">
                Rating:
              </Typography>
              <Rating
                name="simple-controlled"
                value={review?.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="initial">
                ({review?.rating})
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="body1" color="initial">
                FeedBack :{" "}
              </Typography>

              <Typography variant="subtitle1">{review?.feedback}</Typography>
            </Stack>
          </Stack>
        </Paper>
      )}
    </div>
  );
};

export default OwnerUpdate;
