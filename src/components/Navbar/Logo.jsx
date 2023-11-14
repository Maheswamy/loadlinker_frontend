import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box display="flex" alignItems="center">
      <img
        src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/_042d902d-1b10-4c45-aa2f-965175cc4544.jpg"
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
  );
};

export default Logo;
