import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Container } from "@mui/material";

const HomePageCarousel = () => {
  return (
    <Container maxWidth={"100vw"}>
      <Carousel
        height="100vh" // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "cornflowerblue",
            borderRadius: 0,
          },
        }}
        navButtonsWrapperProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            bottom: "0",
            top: "unset",
            color: "red",
          },
        }}
        NextIcon=">" // Change the "inside" of the next button to "next"
        PrevIcon="<"
      >
        <div>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/3702270.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/container-truck-ship-port-ai-generated-image.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/many-transport-trucks-parked-service-station-sunset-ai-generative.jpg"
            alt="Image 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Add more images as needed */}
      </Carousel>
    </Container>
  );
};

export default HomePageCarousel;
