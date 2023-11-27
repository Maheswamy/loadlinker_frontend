const intialState = { marketList: [], singleEnquiry: {}, count: 0 };

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
        count: state.count--,
      };
    }

    case "COUNT": {
      return { ...state, count: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
