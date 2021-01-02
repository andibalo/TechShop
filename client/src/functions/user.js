import axios from "axios";

export const getUserCart = async (authtoken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/user/cart`,

      {
        headers: {
          authtoken,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const emptyCart = async (authtoken) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/user/cart`,

      {
        headers: {
          authtoken,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserAddress = async (authtoken, address) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/address`,
      { address },
      {
        headers: {
          authtoken,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserAddress = async (authtoken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/user/address`,

      {
        headers: {
          authtoken,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const applyCoupon = async (authtoken, coupon) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/cart/coupon`,
      {
        name: coupon.toUpperCase(),
      },
      {
        headers: {
          authtoken,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
