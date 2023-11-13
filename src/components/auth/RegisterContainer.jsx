import { Grid, Stack, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Register from "./Register";

const RegisterContainer = () => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "91vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        component={Paper}
        elevation={6}
        square
        sx={{
          bgcolor: "#ffece6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            my: 4,
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
