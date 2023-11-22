const intialState = { mybids: [], enquiryBids: [], singleBid: {} };

export const bidReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_BID": {
      return { ...state, mybids: [...state.mybids, action.payload] };
    }

    case "GET_OWNER_BID": {
      return { ...state, mybids: action.payload };
    }
    case "GET_BIDS_OF_ENQUIRY": {
      console.log(action.payload);
      return { ...state, enquiryBids: [...action.payload] };
    }
    case "REMOVE_BIDS_OF_ENQUIRY": {
      return { ...state, enquiryBids: [] };
    }
    case "GET_SINGLE_BID_DETAIL": {
      console.log(action.payload);
      return { ...state, singleBid: { ...action.payload } };
    }
    case "CLEAR_SINGLE_BID": {
      console.log("clg");
      return { ...state, singleBid: { ...action.payload } };
    }

    case "REMOVE_MY_BID": {
      return {
        ...state,
        mybids: [
          ...state.mybids.filter((ele) => ele._id !== action.payload._id),
        ],
        singleBid: {},
      };
    }
    case "LOG_CLEAR": {
      return { ...state, mybids: [], enquiryBids: [] };
    }

    default: {
      return { ...state };
    }
  }
};
