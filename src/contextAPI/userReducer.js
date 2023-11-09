const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      console.log(action.payload)
      return { ...state, user: {...action.payload} };
    }
    case "USER_LOGOUT": {
      console.log(action.payload)
      return { ...state, user: {...action.payload} };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
