const intialState = { marketList:[] };

export const marketReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_MARKET_LIST": {
      return { ...state, marketList: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};


