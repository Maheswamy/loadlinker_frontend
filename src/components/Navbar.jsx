import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Stack } from "@mui/material";

const Navbar = () => {
  return (
    <nav>
      <Paper>
        <Stack gap={2} direction="row">
          <Typography variant="p" color="initial">
            SignUp
          </Typography>
        </Stack>
      </Paper>
    </nav>
  );
};

export default Navbar;
