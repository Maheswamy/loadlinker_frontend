import { Stack, Box } from "@mui/material";
import React from "react";
import Register from "./Register";
import Login from "./Login";

const RegisterContainer = () => {
  return (
    <Stack direction="row" gap={2}>
      <Box>
        <img
          src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/hero+image.jpg"
          alt="asjgsagdsadghsgdsg"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "80vh" }}
        />
      </Box>

      <Box>
        {" "}
        <Register />
        <Login />
      </Box>
    </Stack>
  );
};

export default RegisterContainer;
