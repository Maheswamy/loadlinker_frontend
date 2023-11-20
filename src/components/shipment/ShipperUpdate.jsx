import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { startPayment } from "../../redux/action/shipmentAction";

const ShipperUpdate = ({ status, shipmentId, amount }) => {
    console.log(status)
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(startPayment({ shipmentId, amount }));
  };

  return (
    <div>
      {status === "waiting" && (
        <Button variant="contained" color="primary">
          Cancel
        </Button>
      )}
      {status === "loaded" && (
        <Button variant="contained" color="primary" type="button" onClick={handlePayment}>
          Make Payment
        </Button>
      )}
      {status === "unloaded" && (
        <Button variant="contained" color="primary" type="button">
          Review
        </Button>
      )}
    </div>
  );
};

export default ShipperUpdate;
