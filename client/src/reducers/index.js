import { combineReducers } from "redux";
import user from "./user";
import search from "./search";
import cart from "./cart";
import drawer from "./drawer";

const rootReducer = combineReducers({
  user,
  search,
  cart,
  drawer,
});

export default rootReducer;
