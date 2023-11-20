import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Box, Paper, Grid } from "@mui/material";
import { UserContext } from "./../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { clearBidOnLogOut } from "../redux/action/bidAction";
import { clearEnquiryOnLogOut } from "../redux/action/enquiryAction";
import { clearShipmentOnLogOut } from "../redux/action/shipmentAction";
import { clearVehicleOnLogOut } from "./../redux/action/vehicleAction";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    userDispatch({ type: "USER_LOGOUT", payload: {} });
    dispatch(clearBidOnLogOut());
    dispatch(clearEnquiryOnLogOut());
    dispatch(clearShipmentOnLogOut());
    dispatch(clearVehicleOnLogOut());
  };
  const navbarCondition = () => {
    const role = jwtDecode(localStorage.getItem("token")).role;
    if (role === "owner") {
      return (
        <Stack direction={"row"} gap={2}>
          <Link to="/shipments" style={{ textDecoration: "none" }}>
            <Typography variant="button" color="primary">
              My Shipments
            </Typography>
          </Link>
          <Link to="/mybids" style={{ textDecoration: "none" }}>
            <Typography variant="button" color="primary">
              My Bids
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
      );
    } else if (role === "shipper") {
      return (
        <Stack direction={"row"} gap={1}>
          <Link to="/shipments" style={{ textDecoration: "none" }}>
            <Typography variant="button" color="primary">
              My Shipments
            </Typography>
          </Link>
          <Link to="/myenquiries" style={{ textDecoration: "none" }}>
            <Typography variant="button" color="primary">
              My Enquiries
            </Typography>
          </Link>
          <Link to="/addenquiry" style={{ textDecoration: "none" }}>
            <Typography variant="button" color="primary">
              Add Enquire
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
      );
    }
  };
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      component={"nav"}
      maxWidth="xl"
      elevation={10}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000, // You can adjust the z-index based on your layout
        backgroundColor: "#fff",
        padding: "10px 0",
        // borderBottom: "1px solid #ccc", // Optional: Add a border at the bottom for separation
      }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Stack
          elevation={1}
          gap={2}
          height={"9vh"}
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          mx="2"
        >
          <Stack gap={1} direction="row" alignItems="center">
            <Box display="flex" alignItems="center">
              <img
                src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/loadlinker_logo.png"
                alt="Logo"
                style={{ maxWidth: "auto", maxHeight: "50px" }}
              />
              <Typography
                variant="h6"
                sx={{ marginLeft: 1, fontWeight: "900" }}
                color="primary.main"
              >
                LOADLINKER
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Stack
          gap={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="button"
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              Market
            </Typography>
          </Link>

          {isEmpty(userState.user) ? (
            <Stack direction="row" gap={2}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography variant="button" color="primary">
                  Register
                </Typography>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="button" color="primary">
                  Login
                </Typography>
              </Link>
            </Stack>
          ) : (
            navbarCondition()
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Navbar;
