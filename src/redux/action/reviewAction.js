import axios from "../../config/axios";
import { updateShipment } from "./shipmentAction";

export const startGetReviews = () => {
  return async (dispatch) => {
    try {
      const getReviewResponse = await axios.get("/api/reviews", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(getReviewResponse.data);
      dispatch(getReview(getReviewResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startAddReview = (formData) => {
  return async (dispatch) => {
    try {
      const reviewResponse = await axios.post("/api/reviews", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(reviewResponse.data);
      dispatch(updateShipment(reviewResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

const addReview = (data) => {
  return {
    type: "ADD_REVIEW",
    payload: data,
  };
};

const getReview = (data) => {
  return {
    type: "GET_REVIEW",
    payload: data,
  };
};
