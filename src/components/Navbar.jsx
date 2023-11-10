import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Box,Paper } from "@mui/material";
import { UserContext } from "./../contextAPI/UserContext";
import { isEmpty } from "lodash";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const handleLogOut = () => {
    localStorage.removeItem('token')
    userDispatch({ type: "USER_LOGOUT", payload: {} });
  };
  return (
    <Paper elevation={2}  my={2}>
      <Stack
        maxWidth={'xl'}
        elevation={1}
        square="true"
        bgcolor="#ffffff"
        gap={2}
        height={"9vh"}
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        mx="2"
      >
        <Stack gap={1} direction="row" alignItems="center">
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/_042d902d-1b10-4c45-aa2f-965175cc4544.jpg"
            alt="Logo"
            style={{
              maxWidth: "auto",
              maxHeight: "9vh",
            }}
          />
          <Typography
            variant="p1"
            sx={{ fontSize: "32px" }}
            color="primary"
            gutterBottom={false}
          >
            LoadLinker
          </Typography>
        </Stack>
        <Stack gap={2} direction="row" align="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="p1"
              color="text"
              sx={{ textDecoration: "none" }}
            >
              Market
            </Typography>
          </Link>

          {isEmpty(userState.user) ? (
            <Stack direction={"row"} gap={2}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography variant="p1" color="text">
                  Register
                </Typography>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography variant="p1" color="text">
                  Login
                </Typography>
              </Link>
            </Stack>
          ) : (
            <Stack direction={"row"} gap={2}>
              <Link to="/mybids" style={{ textDecoration: "none" }}>
                <Typography variant="p1" color="text">
                  My Bids
                </Typography>
              </Link>
              <Link to="/addvehicle" style={{ textDecoration: "none" }}>
                <Typography variant="p1" color="text">
                  Add Vehicle
                </Typography>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Typography variant="p1" color="text">
                  Profile
                </Typography>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="p1"
                  color="text"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Logout
                </Typography>
              </Link>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Navbar;
