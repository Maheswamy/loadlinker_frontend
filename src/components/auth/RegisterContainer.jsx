import { Grid, Stack, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Register from "./Register";
import Login from "./Login";
import HeroImage from "./HeroImage";

const RegisterContainer = () => {
  return (
    <Grid container component="main" sx={{ height: "91vh" }}>
      <HeroImage />
      <Grid item xs={12} sm={6} md={4} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
          }}
        >
          <Register />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterContainer;
