const intialState = { bids: [] };

export const bidReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_BID": {
      console.log(action.payload);
      return { ...state, bids: [...state.bids,action.payload] };
    }

    default: {
      return { ...state };
    }
  }
};
