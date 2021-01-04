import { COUPON_APPLIED } from "./actions";

const initialState =
  localStorage.getItem("isCouponApplied") === "false" ? false : true;

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COUPON_APPLIED:
      return payload;
    default:
      return state;
  }
};
