import axios from "../../config/axios";

export const startAddBid = (
  formData,
  navigate,
  handleSpinner,
  handleServerError
) => {
  return async (dispatch) => {
    try {
      const addBidResponse = await axios.post("/api/bids", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/mybids");
      dispatch(addBid(addBidResponse.data));
    } catch (e) {
      handleSpinner(false);
      if (e.status !== 500) {
        handleServerError(e.response.data.errors);
      }
      console.log(e);
      alert(e.response.data.errors.msg);
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
      navigate(`/myenquiries/${enquiryId}`);
      dispatch(getEnquiryBids(getBidsResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startGetSingleBidDetails = (bidId) => {
  return async (dispatch) => {
    try {
      const singleBidResponse = await axios.get(`/api/mybids/${bidId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(singleBidResponse.data, "sdasd");
      dispatch(getSingleBidDetails(singleBidResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startRemoveMyBid = (bidId, navigateBack) => {
  return async (dispatch) => {
    try {
      const deleteBidResponse = await axios.delete(`/api/mybids/${bidId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(deleteBidResponse.data);
      navigateBack();
      dispatch(removeMyBid(deleteBidResponse.data));
    } catch (e) {
      alert(e.message);
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
    type: "GET_BIDS_OF_ENQUIRY",
    payload: data,
  };
};

export const emptyEnquiryBids = () => {
  return {
    type: "REMOVE_BIDS_OF_ENQUIRY",
  };
};

export const clearBidOnLogOut = () => {
  return {
    type: "LOG_CLEAR",
  };
};

const getSingleBidDetails = (data) => {
  return {
    type: "GET_SINGLE_BID_DETAIL",
    payload: data,
  };
};

export const clearSingleBidDetails = () => {
  return {
    type: "CLEAR_SINGLE_BID",
    payload: {},
  };
};

const removeMyBid = (data) => {
  return {
    type: "REMOVE_MY_BID",
    payload: data,
  };
};
