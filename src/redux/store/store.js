import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { marketReducer } from "./../reducer/marketReducer";

const configureStore = () => {
  const rootReducer = {
    market: marketReducer,
  };
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
