import axios from "axios";

export const createProduct = async (product, authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/product`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};

export const getProductsByCount = async (count) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

  return res;
};

export const removeProduct = async (slug, authtoken) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API}/product/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};

export const getProduct = async (slug) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

  return res;
};

export const updateProduct = async (product, authtoken, slug) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};
