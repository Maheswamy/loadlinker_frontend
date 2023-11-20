const intialState = { marketList: [], singleEnquiry: {} };

export const marketReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_MARKET_LIST": {
      return { ...state, marketList: action.payload };
    }
    case "GET_SINGLE_ENQUIRY": {
      return { ...state, singleEnquiry: { ...action.payload } };
    }
    case "REMOVE_MARKET_ENQUIRY": {
      return {
        ...state,
        marketList: [
          ...state.marketList.filter((ele) => ele._id !== action.payload),
        ],
      };
    }

    
    default: {
      return { ...state };
    }
  }
};
