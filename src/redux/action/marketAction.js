import axios from "../../config/axios";

export const startGetMarketList = () => {
  return async (dispatch) => {
    try {
      const marketResponse = await axios.get("/api/marketplace");
      console.log(marketResponse.data);
      dispatch(getMarketList(marketResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

const getMarketList = (data) => {
  return {
    type: "GET_MARKET_LIST",
    payload: data,
  };
};
