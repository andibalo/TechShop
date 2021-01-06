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

export const createOrder = async (authtoken, stripeResponse) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/order`,
      {
        stripeResponse,
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

export const getUserOrders = async (authtoken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/user/orders`,

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

export const getUserWishlist = async (authtoken) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/user/wishlist`,

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

export const removeWishlist = async (authtoken, productId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/user/wishlist/${productId}`,

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

export const addToWishlist = async (authtoken, productId) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/user/wishlist`,
      { productId },
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
