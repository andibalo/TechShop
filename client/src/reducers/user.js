import { GET_USER, LOG_OUT, USER_WISHLIST } from "./actions";

const initialState = {
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return { ...payload, loading: false };
    case LOG_OUT:
      return null;
    case USER_WISHLIST:
      return { ...state, wishlist: payload };
    default:
      return state;
  }
};
