import React, { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "./../../contextAPI/UserContext";
import { useDispatch } from "react-redux";
import {
  clearBidOnLogOut,
  emptyEnquiryBids,
} from "../../redux/action/bidAction";
import { clearEnquiryOnLogOut } from "../../redux/action/enquiryAction";
import { clearShipmentOnLogOut } from "../../redux/action/shipmentAction";
import { clearVehicleOnLogOut } from "./../../redux/action/vehicleAction";

const VehicleOwnerNav = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    userDispatch({ type: "USER_LOGOUT", payload: {} });
    dispatch(clearBidOnLogOut());
    dispatch(clearEnquiryOnLogOut());
    dispatch(clearShipmentOnLogOut());
    dispatch(clearVehicleOnLogOut());
    dispatch(emptyEnquiryBids());
  };
  return (
    <>
      <Stack direction={{ sx: "column", md: "row" }} gap={2}>
        <Link to="/shipments" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Shipments
          </Typography>
        </Link>
        <Link to="/mybids" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Bids
          </Typography>
        </Link>
        <Link to="/addvehicle" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Add Vehicle
          </Typography>
        </Link>
        <Link to="/myvehicle" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            My Vehicle
          </Typography>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Profile
          </Typography>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Typography
            variant="button"
            color="primary"
            onClick={() => {
              handleLogOut();
            }}
          >
            Logout
          </Typography>
        </Link>
      </Stack>
    </>
  );
};

export default VehicleOwnerNav;
