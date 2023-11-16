const intialState = { myShipments: [], serverError: {} };

const shipmentReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_SHIPMENTS": {
      return { ...state, myShipments: [...action.payload] };
    }
    case "APPROVE_BID": {
      return { ...state, myShipments: [...state.myShipments, action.payload] };
    }
    default: {
      return { ...state };
    }
  }
};

export default shipmentReducer;
