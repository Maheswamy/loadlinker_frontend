import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Stack, Box, Grid } from "@mui/material";

const Navbar = () => {
  return (
    <Box  maxWidth="xl">
      <Stack
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
            variant="h6"
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
              variant="h6"
              color="text"
              sx={{ textDecoration: "none" }}
            >
              Market
            </Typography>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="text">
              Register
            </Typography>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="text">
              Login
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
