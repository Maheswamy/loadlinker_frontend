import React from "react";
import {Box,ImageList,ImageListItem} from '@mui/material';


const ShowImage = ({images}) => {
  return (
    <Box sx={{ width: "auto", height: 450, overflowX: "scroll" }}>
      <ImageList variant="masonry" cols={images.length} gap={2}>
        {images.map((item) => (
          <ImageListItem key={item._id} >
            <img
            //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=248&fit=crop&auto=format`}
            //   alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ShowImage;
