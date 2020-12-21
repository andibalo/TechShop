import { SEARCH_QUERY, SEARCH_PRODUCTS, LOADING } from "./actions";

const initialState = {
  text: "",
  products: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_QUERY:
      return { ...state, text: payload };
    case SEARCH_PRODUCTS:
      return { ...state, products: payload, text: "", loading: false };
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
