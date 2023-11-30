import { Paper } from "@mui/material";
import React from "react";

const DetailBox = ({ heading, info, image, alt }) => {
  return (
    <Paper xs={3} component={"Stack"} direction={"row"}>
      <>
        <img src={image} alt={alt} />
        <h5>{heading}</h5>
        <h6>{info}</h6>
      </>
    </Paper>
  );
};

export default DetailBox;
