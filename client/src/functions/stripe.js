import axios from "axios";

export const createPaymentIntent = async (authtoken, isCouponApplied) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {
      isCouponApplied,
    },
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};
