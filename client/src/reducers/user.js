import { GET_USER, LOG_OUT } from "./actions";

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
    default:
      return state;
  }
};
