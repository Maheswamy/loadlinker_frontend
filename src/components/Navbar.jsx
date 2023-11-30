import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Box, Paper, Grid } from "@mui/material";
import { UserContext } from "./../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { jwtDecode } from "jwt-decode";
import ShipperNavbar from "./Navbar/ShipperNavbar";
import VehicleOwnerNav from "./Navbar/VehicleOwnerNav";
import AdminNavbar from "./Navbar/AdminNavbar";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const navbarCondition = () => {
    const role = jwtDecode(localStorage.getItem("token")).role;
    if (role === "owner") {
      return <VehicleOwnerNav />;
    } else if (role === "shipper") {
      return <ShipperNavbar />;
    } else if (role === "admin") {
      return <AdminNavbar />;
    }
  };
  return (
    <Grid
      container
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      component={"nav"}
      maxWidth="100vw"
      marginBottom={2}
      elevation={10}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        padding: "0 40px",
        boxShadow: 3,
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
