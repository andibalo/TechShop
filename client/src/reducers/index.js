import { combineReducers } from "redux";
import user from "./user";
import search from "./search";
import cart from "./cart";

const rootReducer = combineReducers({
  user,
  search,
  cart,
});

export default rootReducer;
