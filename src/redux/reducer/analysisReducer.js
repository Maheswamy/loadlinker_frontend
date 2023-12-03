const initialState = { info: {} };

const analysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO": {
      return { ...state, info: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default analysisReducer;
