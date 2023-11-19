import React from "react";
import { Chip } from "@mui/material";

const StateTag = ({ state }) => {
  return <Chip label={state} variant="outlined" />;
};

export default StateTag;
