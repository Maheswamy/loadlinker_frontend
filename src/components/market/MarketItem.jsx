import React from "react";
import {
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Box,
  Stack,
  CardMedia,
} from "@mui/material";

const MarketItem = ({
  loadType,
  loadWeight,
  pickUpLocation,
  dropUpLocation,
  paymentType,
  amount,
}) => {
  return (
    <Card sx={{ maxWidth: 400 }} elevation={2}>
      <CardContent>
        <Stack direction="row" gap={2}>
          <Box>
            <Typography gutterBottom variant="p" component="span">
              Load Type:
            </Typography>
            <Typography gutterBottom variant="h5" component="span">
              {loadType}
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="p" component="span">
              Load Weigth:
            </Typography>
            <Typography gutterBottom variant="h5" component="span">
              {Number(loadWeight) / 1000} Tonnes
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent={"space-evenly"} gap={3}>
          <Box>
            <CardMedia
              sx={{ height: 100, width: 100, objectFit: "cover" }}
              image="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/2108.jpg"
              title="goods image"
              component="span"
            />
          </Box>
          <Stack direction="column" gap={2}>
            <Box>
              <Typography gutterBottom variant="p" component="span">
                Pickup location:
              </Typography>
              <Typography gutterBottom variant="h5" component="span">
                {pickUpLocation.district}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="p" component="span">
                Drop location:
              </Typography>
              <Typography gutterBottom variant="h5" component="span">
                {dropUpLocation.district}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box>
          <Typography gutterBottom variant="subtitle1" component="span">
            Payment Type:
          </Typography>
          <Typography gutterBottom variant="p" component="span">
            {paymentType}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="subtitle1" component="span">
            Amount:
          </Typography>
          <Typography gutterBottom variant="p" component="span">
          ₹ {Math.round(amount)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained">
          BID
        </Button>
        <Button size="large" variant="text">
          Show more
        </Button>
      </CardActions>
    </Card>
  );
};

export default MarketItem;
