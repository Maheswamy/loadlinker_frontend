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

export const startGetEnquiryBids = (enquiryId, navigate) => {
  return async (dispatch) => {
    try {
      const getBidsResponse = await axios.get(`/api/bids/${enquiryId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(getBidsResponse.data);
      navigate("/enquiryBids");
      dispatch(getEnquiryBids(getBidsResponse.data));
    } catch (e) {
      console.log(e);
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

const getEnquiryBids = (data) => {
  return {
    type: "GET_BIDS_OF_ENQUITY",
    payload: data,
  };
};

const emptyEnquiryBids = () => {
  return {
    type: "REMOVE_BIDS_OF_ENQUIRY",
  };
};
