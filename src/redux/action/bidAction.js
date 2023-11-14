import axios from "../../config/axios";

export const startAddBid = (formData) => {
  return async (dispatch) => {
    try {
      const addBidResponse = await axios.post("/api/bids", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addBid(addBidResponse.data));
      console.log(addBidResponse);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startGetMyBid = () => {
  return async (disaptch) => {
    try {
      const myBidResponse = await axios.get("/api/bids", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(myBidResponse.data);
      disaptch(getMyBids(myBidResponse.data));
    } catch (e) {
      console.log(e);
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

const getMyBids = (data) => {
  return {
    type: "GET_OWNER_BID",
    payload: data,
  };
};
