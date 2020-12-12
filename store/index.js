import { createStore, combineReducers } from "redux";
import ProductReducer from "./reducers/product";
import UserReducer from "./reducers/user";

// const store = createStore(User);

const store = createStore(
  combineReducers({
    user: UserReducer,
    product: ProductReducer,
  })
);

export default store;
