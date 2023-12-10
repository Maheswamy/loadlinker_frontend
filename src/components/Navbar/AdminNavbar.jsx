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

const AdminNavbar = () => {
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
      <Stack direction={{ sx: "column", md: "row" }} gap={1} >
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Dashboard
          </Typography>
        </Link>
        <Link to="/vehicleapproval" style={{ textDecoration: "none" }}>
          <Typography variant="button" color="primary">
            Pending Approval
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

export default AdminNavbar;
