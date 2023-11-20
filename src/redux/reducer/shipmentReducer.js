const intialState = { myShipments: [], serverError: {}, payment: {} };

const shipmentReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_SHIPMENTS": {
      return { ...state, myShipments: [...action.payload] };
    }
    case "APPROVE_BID": {
      return { ...state, myShipments: [...state.myShipments, action.payload] };
    }
    case "PAYMENT_DETAIL": {
      return { ...state, payment: { ...action.payload } };
    }
    case "LOG_CLEAR": {
      return { ...state, myShipments: [], serverError: {}, payment: {} };
    }
    default: {
      return { ...state };
    }
  }
};

export default shipmentReducer;
