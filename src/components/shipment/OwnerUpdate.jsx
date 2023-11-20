import React from "react";
import { Button, Typography } from "@mui/material";
import { startUpdateShipment } from "./../../redux/action/shipmentAction";
import { useDispatch } from "react-redux";

const OwnerUpdate = ({ status, shipmentId }) => {
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
    </div>
  );
};

export default OwnerUpdate;
