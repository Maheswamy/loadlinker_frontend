import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Rating,
  TextField,
  CircularProgress,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { startPayment } from "../../redux/action/shipmentAction";
import { ToastContainer, toast } from "react-toastify";
import { startAddReview } from "./../../redux/action/reviewAction";
import { isEmpty } from "lodash";

const ShipperUpdate = ({
  status,
  shipmentId,
  amount,
  payment = null,
  review,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const state = useSelector((state) => state.shipment);
  console.log(state, isEmpty(review));

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
      {status === "unloaded" && (
        <Typography variant="h6" color="primary">
          Shipment delivered
        </Typography>
      )}
      {status === "waiting" && (
        <Button variant="contained" color="primary">
          Cancel
        </Button>
      )}
      {status === "loaded" && !payment && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handlePayment}
          fullWidth
        >
          Make Payment
        </Button>
      )}
      {status === "unloaded" && isEmpty(review) && (
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
            <>
              {isEmpty(review) && (
                <Button variant="contained" color="primary" type="Submit">
                  Review
                </Button>
              )}
            </>
          )}
        </Grid>
      )}
      {review && (
        <Paper sx={{ marginTop: "20px", padding: "20px" }}>
          <Stack spacing={3}>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="body1" color="initial">
                Rating:
              </Typography>
              <Rating
                name="simple-controlled"
                value={review?.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="initial">
                ({review?.rating})
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="body1" color="initial">
                FeedBack :{" "}
              </Typography>

              <Typography variant="subtitle1">{review?.feedback}</Typography>
            </Stack>
          </Stack>
        </Paper>
      )}
    </div>
  );
};

export default ShipperUpdate;
