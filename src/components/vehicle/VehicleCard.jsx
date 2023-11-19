import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const VehicleCard = ({
  _id,
  isVerified,
  vehicleImages,
  vehicleNumber,
  loaded,
  permittedLoadCapacity,
}) => {
  const navigator = useNavigate();
  const handleShow = () => {
    navigator(`/myvehicle/${_id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardActionArea onClick={handleShow}>
        <CardMedia
          component="img"
          height="140"
          image={vehicleImages[0].url}
          alt="vehicle Image"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="span">
            verified:
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="span"
            color={isVerified === "approved" ? "green" : "red"}
          >
            {isVerified}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vehicle number: {vehicleNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Load Capacity: {permittedLoadCapacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available: {loaded ? "In Shipment" : "Empty"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VehicleCard;
