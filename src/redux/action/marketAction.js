import axios from "../../config/axios";

export const startGetMarketList = (
  source = "",
  destination = "",
  loadWeight = "",
  skip = 0
) => {
  return async (dispatch) => {
    try {
      const marketResponse = await axios.get(
        `/api/marketplace?source=${source}&destination=${destination}&loadWeight=${loadWeight}&skip=${skip}`
      );
      dispatch(getMarketList(marketResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startGetSingleEnquiry = (id) => {
  return async (dispatch) => {
    try {
      const singleEnquiryResponse = await axios.get(`/api/enquiries/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getSingleEnquiry(singleEnquiryResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startGetCount = () => {
  return async (dispatch) => {
    try {
      const countResponse = await axios.get("/api/count", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch(getCount(countResponse.data));
    } catch (e) {}
  };
};

const getMarketList = (data) => {
  return {
    type: "GET_MARKET_LIST",
    payload: data,
  };
};

const getSingleEnquiry = (data) => {
  return {
    type: "GET_SINGLE_ENQUIRY",
    payload: data,
  };
};

export const removeEnquiryFromMarket = (data) => {
  return {
    type: "REMOVE_MARKET_ENQUIRY",
    payload: data,
  };
};

const getCount = (data) => {
  return {
    type: "COUNT",
    payload: data,
  };
};
