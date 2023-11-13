const intialState = { vehicleType: [], permit: [], myVehicle: [] };

const vehicleReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_VEHICLE_TYPE_LIST": {
      return { ...state, vehicleType: [...action.payload] };
    }
    case "GET_PERMIT_LIST": {
      return { ...state, permit: [...action.payload] };
    }
    case "ADD_VEHICLE": {
      return { ...state, myVehicle: [...state.myVehicle, action.payload] };
    }
    default: {
      return { ...state };
    }
  }
};

export default vehicleReducer;
