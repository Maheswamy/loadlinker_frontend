import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Rating, TextField } from "@mui/material";
import { startPayment } from "../../redux/action/shipmentAction";
import { ToastContainer, toast } from "react-toastify";

const ShipperUpdate = ({ status, shipmentId, amount, payment = null }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handlePayment = () => {
    dispatch(startPayment({ shipmentId, amount }));
  };

  // const validation=()=>{
  //   if(rating)
  // }
  const handleAddReview = (e) => {
    e.preventDefault();
    
    // validation
  };

  return (
    <div>
      <ToastContainer />
      {status === "waiting" && (
        <Button variant="contained" color="primary">
          Cancel
        </Button>
      )}
      {!payment && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handlePayment}
        >
          Make Payment
        </Button>
      )}
      {status === "unloaded" && (
        <Grid component={"form"} onSubmit={handleAddReview}>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <TextField
            id="feedback"
            label="write your feedback here"
            multiline
            maxRows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="standard"
          />
          <Button variant="contained" color="primary" type="Submit">
            Review
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default ShipperUpdate;
