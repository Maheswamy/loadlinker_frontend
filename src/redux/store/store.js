import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { marketReducer } from "./../reducer/marketReducer";
import vehicleReducer from "./../reducer/vehicleReducer";

const configureStore = () => {
  const rootReducer = {
    market: marketReducer,
    vehicle: vehicleReducer,
  };
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
