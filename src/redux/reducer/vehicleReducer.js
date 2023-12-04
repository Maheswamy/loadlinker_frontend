const intialState = { vehicleType: [], permit: [], myVehicle: [] };

const vehicleReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_VEHICLE": {
      return { ...state, myVehicle: action.payload };
    }
    case "GET_VEHICLE_TYPE_LIST": {
      return { ...state, vehicleType: [...action.payload] };
    }
    case "GET_PERMIT_LIST": {
      return { ...state, permit: [...action.payload] };
    }
    case "ADD_VEHICLE": {
      return { ...state, myVehicle: [...state.myVehicle, action.payload] };
    }
    case "UPDATE_VEHICLE": {
      console.log(action.payload, "asda");
      return {
        ...state,
        myVehicle: [
          ...state.myVehicle.map((ele) => {
            if (ele._id === action.payload._id) {
              return { ...action.payload };
            } else {
              return { ...ele };
            }
          }),
        ],
      };
    }
    case "REMOVE_VEHICLE": {
      return {
        ...state,
        myVehicle: [
          ...state.myVehicle.map((ele) => {
            if (ele._id === action.payload._id) {
              return { ...action.payload };
            } else {
              return { ...ele };
            }
          }),
        ],
      };
    }
    case "LOG_CLEAR": {
      return { ...state, vehicleType: [], permit: [], myVehicle: [] };
    }
    default: {
      return { ...state };
    }
  }
};

export default vehicleReducer;
