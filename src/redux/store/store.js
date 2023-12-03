import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { marketReducer } from "./../reducer/marketReducer";
import vehicleReducer from "./../reducer/vehicleReducer";
import { bidReducer } from "../reducer/bidReducer";
import enquiryReducer from "../reducer/enquiryReducer";
import shipmentReducer from "../reducer/shipmentReducer";
import reviewReducer from "../reducer/reviewReducer";
import analysisReducer from "../reducer/analysisReducer";

const configureStore = () => {
  const rootReducer = {
    market: marketReducer,
    vehicle: vehicleReducer,
    bid: bidReducer,
    enquiry: enquiryReducer,
    shipment: shipmentReducer,
    review: reviewReducer,
    analysis:analysisReducer
  };
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
