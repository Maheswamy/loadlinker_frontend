import { CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function ImageComp({ images }) {
  return (
    <Carousel
      sx={{ width: "70vw", height: "60vh", margin: "auto" }}
      autoPlay={false}
      navButtonsProps={{
        style: {
          backgroundColor: "#ffb399",
          borderRadius: 0,
          color: "#000000",
        },
      }}
      navButtonsAlwaysVisible={true}
    >
      {images.map((ele) => {
        return (
          <CardMedia
            component="img"
            alt={images._id}
            height="400"
            key={ele._id}
            image={ele.url}
            sx={{
              objectFit: "contain",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
            }}
          />
        );
      })}
    </Carousel>
  );
}
