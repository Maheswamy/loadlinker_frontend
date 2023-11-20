import React from "react";
import Login from "./Login";
import { Grid, Box, Paper } from "@mui/material";

const LoginContainer = () => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "91vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        component={Paper}
        sx={{
          backgroundColor:'#ffece6',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
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

export default LoginContainer;
