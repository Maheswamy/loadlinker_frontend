import axios from "../../config/axios";

export const startGetMarketList = () => {
  return async (dispatch) => {
    try {
      const marketResponse = await axios.get("/api/marketplace");
      console.log(marketResponse.data);
      dispatch(getMarketList(marketResponse.data));
    } catch (e) {
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
      console.log(singleEnquiryResponse.data);
      dispatch(getSingleEnquiry(singleEnquiryResponse.data));
    } catch (e) {
      alert(e.message);
    }
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
