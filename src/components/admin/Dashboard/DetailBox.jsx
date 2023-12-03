import { Paper, Typography, Box } from "@mui/material";
import React from "react";

const MyComponent = ({ image, alt, heading, info, amount }) => {
  return (
    <Paper
      xs={12}
      sm={3}
      component={Box}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      boxShadow={3}
      borderRadius={8}
      m={1}
      p={2}
    >
      <>
        <img src={image} alt={alt} />
        <Typography variant="h5" component="h5" style={{ margin: "10px 0" }}>
          {heading}
        </Typography>
        <Typography variant="h6" style={{ color: "#555" }}>
          {amount
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(info).slice(0,-3)
            : info}
        </Typography>
      </>
    </Paper>
  );
};

export default MyComponent;
