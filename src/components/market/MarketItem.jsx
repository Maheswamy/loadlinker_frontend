import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  Box,
  Stack,
  CardMedia,
  Grid,
} from "@mui/material";
import { isEmpty } from "lodash";
import { UserContext } from "./../../contextAPI/UserContext";
import { jwtDecode } from "jwt-decode";

const MarketItem = ({
  _id,
  loadType,
  loadWeight,
  pickUpLocation,
  dropOffLocation,
  paymentType,
  amount,
}) => {
  const { userState } = useContext(UserContext);

 
  return (
    <Card sx={{ minWidth: 300 }} elevation={2}>
      <CardContent>
        <Stack direction="row" gap={2}>
          <Box>
            <Typography gutterBottom variant="p" component="span">
              Load Type:
            </Typography>
            <Typography gutterBottom variant="p" component="span">
              {loadType}
            </Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="p" component="span">
              Load Weigth:
            </Typography>
            <Typography gutterBottom variant="p" component="span">
              {(Number(loadWeight) / 1000).toFixed(1)} Tonnes
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
              <Typography gutterBottom variant="p" component="span">
                {pickUpLocation.district}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="p" component="span">
                Drop location:
              </Typography>
              <Typography gutterBottom variant="p" component="span">
                {dropOffLocation?.district}
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
            {amount}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Link to={isEmpty(userState.user) ? "/login" : `/market/${_id}`}>
          <Button size="large" variant="contained">
            {localStorage.getItem("token") &&
            jwtDecode(localStorage.getItem("token"))?.role === "owner"
              ? "BID"
              : "SHOW MORE"}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MarketItem;
