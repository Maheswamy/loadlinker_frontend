const intialState = { mybids: [] };

export const bidReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_BID": {
      console.log(action.payload);
      return { ...state, mybids: [...state.mybids, action.payload] };
    }

    case "GET_OWNER_BID": {
      console.log(action.payload);
      return { ...state, mybids: action.payload };
    }

    default: {
      return { ...state };
    }
  }
};
