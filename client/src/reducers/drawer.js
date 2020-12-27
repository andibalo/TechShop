import { SET_VISIBILITY } from "./actions";

export default (state = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_VISIBILITY:
      return payload;
    default:
      return state;
  }
};
