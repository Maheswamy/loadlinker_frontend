const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_REVIEW": {
      return { ...state, reviews: action.payload };
    }
    case "ADD_REVIEW": {
      return { ...state, reviews: [...state.reviews, action.payload] };
    }

    default: {
      return { ...state };
    }
  }
};

module.exports = reviewReducer;
