import axios from "../../config/axios";

export const startAddBid = (formData) => {
  return async (dispatch) => {
    try {
      const addBidResponse = await axios.post("/api/bids", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addBid(addBidResponse.data))
      console.log(addBidResponse);
    } catch (e) {
      console.log(e)
        alert(e.message);
    }
  };
};

const addBid = (data) => {
  return {
    type: "ADD_BID",
    payload: data,
  };
};
