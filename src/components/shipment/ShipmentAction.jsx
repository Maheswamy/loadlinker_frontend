import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { startPayment } from "../../redux/action/shipmentAction";

const ShipmentAction = ({ status, shipmentId, amount }) => {
  const dispatch = useDispatch();
  const handlePayment = () => {
    console.log({ status, shipmentId, amount });
    dispatch(startPayment({ shipmentId, amount }));
  };
  return (
    <div>
      {status === "waiting" ? (
        <Button variant="contained" color="primary">
          Cancle
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handlePayment}
        >
          Make Payment
        </Button>
      )}
    </div>
  );
};

export default ShipmentAction;
