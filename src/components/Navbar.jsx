import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Box, Paper, Grid } from "@mui/material";
import { UserContext } from "./../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    userDispatch({ type: "USER_LOGOUT", payload: {} });
  };
  const navbarCondition = () => {
    const role = jwtDecode(localStorage.getItem("token")).role;
    console.log(role);
    if (role === "owner") {
      return (
        <Stack direction={"row"} gap={2}>
          <Link to="/mybids" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              My Bids
            </Typography>
          </Link>
          <Link to="/addvehicle" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              Add Vehicle
            </Typography>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              Profile
            </Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              variant='button'
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
            <Typography variant='button' color="primary">
              My Shipments
            </Typography>
          </Link>
          <Link to="/myenquiries" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              My Enquiries
            </Typography>
          </Link>
          <Link to="/addenquiry" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              Add Enquire
            </Typography>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Typography variant='button' color="primary">
              Profile
            </Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              variant='button'
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
    >
      <Grid item xs={12} sm={6} md={4}>
        <Stack
          elevation={1}
          square
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
              variant='button'
              color="primary"
              sx={{ textDecoration: "none" }}
            >
              Market
            </Typography>
          </Link>

          {isEmpty(userState.user) ? (
            <Stack direction="row" gap={2}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography variant='button' color="primary">
                  Register
                </Typography>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant='button' color="primary">
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
