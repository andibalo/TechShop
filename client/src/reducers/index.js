import { combineReducers } from "redux";
import user from "./user";
import search from "./search";

const rootReducer = combineReducers({
  user,
  search,
});

export default rootReducer;
