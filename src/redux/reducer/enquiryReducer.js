const intialState = {
  enquiryCalculation: {},
  enquries: [],
  newCoordinates: {
    source: { lat: null, lng: null },
    distination: { lat: null, lng: null },
  },
};

const enquiryReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_CALCULATION": {
      console.log(action.payload);
      return { ...state, enquiryCalculation: action.payload };
    }
    case "NEW_CALCULATION_COORDINATES": {
      return { ...state, newCoordinates: { ...action.payload } };
    }
    case "ADD_ENQUIY": {
      console.log(action.payload);
      return { ...state, enquries: [...state.enquries, action.payload] };
    }
    case "REMOVE_CALCULATION": {
      return { ...state, enquiryCalculation: {} };
    }
    default: {
      return { ...state };
    }
  }
};
export default enquiryReducer;
