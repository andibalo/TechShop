import { ADD_TO_CART, EMPTY_CART } from "./actions";

const initialState = localStorage.getItem("cart")
  ? [...JSON.parse(localStorage.getItem("cart"))]
  : [];

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_TO_CART:
      return payload;
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};
