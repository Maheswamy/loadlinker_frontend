const intialState = { marketList: [], singleEnquiry: {} };

export const marketReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_MARKET_LIST": {
      console.log(action.payload)
      return { ...state, marketList: action.payload };
    }
    case "GET_SINGLE_ENQUIRY": {
      console.log(action.payload);
      return { ...state, singleEnquiry: { ...action.payload } };
    }
    default: {
      return { ...state };
    }
  }
};
