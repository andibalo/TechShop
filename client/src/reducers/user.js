import { GET_USER, LOG_OUT } from "./actions";

export default (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return payload;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};
