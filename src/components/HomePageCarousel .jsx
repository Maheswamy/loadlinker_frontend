import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Container } from "@mui/material";

const HomePageCarousel = () => {
  return (
    <Container maxWidth="lg"> {/* Adjust the maxWidth as needed */}
      <Carousel
        autoPlay={true} // Enable auto-play if desired
        interval={5000} // Set the interval between slides in milliseconds
        navButtonsProps={{
          style: {
            backgroundColor: "cornflowerblue",
            borderRadius: 0,
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: "0",
            top: "unset",
            color: "red",
          },
        }}
        NextIcon=">"
        PrevIcon="<"
      >
        <div style={{ height: "60vh" }}>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/3702270.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ height: "60vh" }}>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/container-truck-ship-port-ai-generated-image.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ height: "60vh" }}>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/many-transport-trucks-parked-service-station-sunset-ai-generative.jpg"
            alt="Image 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Carousel>
    </Container>
  );
};

export default HomePageCarousel;
