import React from "react";
import { Grid } from "@mui/material";

const HeroImage = () => {
  return (
    <Grid
      item
      xs={false}
      sm={6}
      md={8}
      
      sx={{
        backgroundImage:
          "url(https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/many-transport-trucks-parked-service-station-sunset-ai-generative.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></Grid>
  );
};

export default HeroImage;
