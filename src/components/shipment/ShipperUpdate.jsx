import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { startPayment } from "../../redux/action/shipmentAction";
import { ToastContainer,toast } from "react-toastify";

const ShipperUpdate = ({ status, shipmentId, amount, payment=null }) => {
  console.log(status, payment);
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(startPayment({ shipmentId, amount }));
  };

  return (
    <div>
      <ToastContainer/>
      {status === "waiting" && (
        <Button variant="contained" color="primary">
          Cancel
        </Button>
      )}
      {!payment && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handlePayment}
        >
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
