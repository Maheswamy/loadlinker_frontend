const intialState = {
  enquiryCalculation: {},
  enquries: [],
  newCoordinates: {},
};

const enquiryReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_CALCULATION": {
      return { ...state, enquiryCalculation: action.payload };
    }
    case "NEW_CALCULATION_COORDINATES": {
      console.log(action.payload);
      return { ...state, newCoordinates: { ...action.payload } };
    }
    case "REMOVE_CALCULATION": {
      return { ...state, enquiryCalculation: {} };
    }
    case "GET_MY_ENQUIRIES": {
      console.log(action.payload);
      return { ...state, enquries: [...action.payload] };
    }

    case "ADD_ENQUIRY": {
      console.log(action.payload);
      return { ...state, enquries: [...state.enquries, action.payload] };
    }
    case "REMOVE_ENQUIRY": {
      console.log(action.payload);
      return {
        ...state,
        enquries: [
          ...state.enquries.filter((ele) => ele._id !== action.payload),
        ],
      };
    }

    case "LOG_CLEAR": {
      return {
        ...state,
        enquiryCalculation: {},
        enquries: [],
        newCoordinates: {
          source: { lat: null, lng: null },
          distination: { lat: null, lng: null },
        },
      };
    }

    default: {
      return { ...state };
    }
  }
};
export default enquiryReducer;
