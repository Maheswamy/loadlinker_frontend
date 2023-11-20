import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import OwnerUpdate from "./OwnerUpdate";
import ShipperUpdate from "./ShipperUpdate";
import { startPayment } from "../../redux/action/shipmentAction";
import { jwtDecode } from "jwt-decode";

const ShipmentActionPage = ({ status, shipmentId, amount }) => {
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(startPayment({ shipmentId, amount }));
  };

  const role = jwtDecode(localStorage.getItem("token")).role;

  return (
    <div>
      {role === "owner" && <OwnerUpdate status={status} shipmentId={shipmentId} />}
      {role === "shipper" && <ShipperUpdate status={status} shipmentId={shipmentId} amount={amount} />}
    </div>
  );
};

export default ShipmentActionPage;
