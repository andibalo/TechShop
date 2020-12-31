import axios from "axios";

export const getCoupons = async (authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/coupons`, {
    headers: {
      authtoken,
    },
  });

  return res;
};

export const deleteCoupon = async (authtoken, couponId) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};

export const createCoupon = async (authtoken, coupon) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    {
      ...coupon,
    },
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};
