import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { marketReducer } from "./../reducer/marketReducer";
import vehicleReducer from "./../reducer/vehicleReducer";
import { bidReducer } from "../reducer/bidReducer";
import enquiryReducer from "../reducer/enquiryReducer";

const configureStore = () => {
  const rootReducer = {
    market: marketReducer,
    vehicle: vehicleReducer,
    bid: bidReducer,
    enquiry: enquiryReducer,
  };
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
