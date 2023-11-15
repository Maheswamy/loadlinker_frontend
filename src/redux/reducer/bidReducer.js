const intialState = { mybids: [], enquiryBids: [] };

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
    case "GET_BIDS_OF_ENQUITY": {
      return { ...state, enquiryBids: [...action.payload] };
    }
    case "REMOVE_BIDS_OF_ENQUIRY": {
      return { ...state, enquiryBids: [] };
    }

    default: {
      return { ...state };
    }
  }
};
