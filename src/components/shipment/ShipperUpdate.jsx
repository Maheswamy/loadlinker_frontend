import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Grid,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import { startPayment } from "../../redux/action/shipmentAction";
import { ToastContainer, toast } from "react-toastify";
import { startAddReview } from "./../../redux/action/reviewAction";

const ShipperUpdate = ({ status, shipmentId, amount, payment = null }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const handlePayment = () => {
    dispatch(startPayment({ shipmentId, amount }));
  };

  const validation = () => {
    if (rating <= 0) {
      errors.rating = "Rating is required";
    }
    if (feedback.trim().length === 0) {
      errors.feedback = "feedback is required";
    }
    setFormErrors(errors);
    return Object.values(errors).length === 0;
  };
  const handleAddReview = (e) => {
    e.preventDefault();
    const validationResult = validation();
    if (validationResult) {
      setIsLoading(true);
      setFormErrors({});
      setServerErrors({});
      const formData = {
        rating,
        feedback,
        shipmentId,
      };
      dispatch(startAddReview(formData));
    }
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
            onError={(formErrors?.rating || serverErrors?.rating) && true}
            helperText={formErrors?.rating || serverErrors?.rating}
            precision={0.5}
          />
          <TextField
            id="feedback"
            label="write your feedback here"
            multiline
            maxRows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="standard"
            onError={(formErrors?.feedback || serverErrors?.feedback) && true}
            helperText={formErrors?.feedback || serverErrors?.feedback}
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" color="primary" type="Submit">
              Review
            </Button>
          )}
        </Grid>
      )}
    </div>
  );
};

export default ShipperUpdate;
