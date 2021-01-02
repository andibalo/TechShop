import axios from "axios";

export const createPaymentIntent = async (authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};
