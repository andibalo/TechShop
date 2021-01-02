import { combineReducers } from "redux";
import user from "./user";
import search from "./search";
import cart from "./cart";
import drawer from "./drawer";
import coupon from "./coupon";

const rootReducer = combineReducers({
  user,
  search,
  cart,
  drawer,
  coupon,
});

export default rootReducer;
