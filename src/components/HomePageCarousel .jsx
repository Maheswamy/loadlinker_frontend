import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Container } from "@mui/material";

const HomePageCarousel = () => {
  return (
    <Container maxWidth={'100vw'}>
      <Box mt={4}>
        <Carousel>
          <div>
            <img
              src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/3702270.jpg"
              alt="Image 1"
            />
          </div>
          <div>
            <img
              src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/container-truck-ship-port-ai-generated-image.jpg"
              alt="Image 2"
            />
          </div>
          <div>
            <img
              src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/many-transport-trucks-parked-service-station-sunset-ai-generative.jpg"
              alt="Image 3"
            />
          </div>
          {/* Add more images as needed */}
        </Carousel>
      </Box>
    </Container>
  );
};

export default HomePageCarousel;
