const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, user: { ...action.payload } };
    }
    case "USER_UPDATE": {
      return { ...state, user: { ...state.user,...action.payload } };
    }
    case "USER_LOGOUT": {
      return { ...state, user: { ...action.payload } };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
