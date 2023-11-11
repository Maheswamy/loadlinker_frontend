import React from "react";
import Login from "./Login";
import HeroImage from "./HeroImage";
import { Grid, Box, Paper } from "@mui/material";

const LoginConatiner = () => {
  return (
    <Grid container component="main" sx={{ height: "91vh" }}>
      <HeroImage />
      <Grid item xs={12} sm={6} md={4} component={Paper}  square>
        <Box
          sx={{
            my: 8,
            mx: 4,
          }}
        >
          <Login />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginConatiner;
