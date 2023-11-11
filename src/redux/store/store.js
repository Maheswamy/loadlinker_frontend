import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { marketReducer } from "./../reducer/marketReducer";
import vehicleReducer from "./../reducer/vehicleReducer";
import { bidReducer } from "../reducer/bidReducer";

const configureStore = () => {
  const rootReducer = {
    market: marketReducer,
    vehicle: vehicleReducer,
    bid: bidReducer,
  };
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
