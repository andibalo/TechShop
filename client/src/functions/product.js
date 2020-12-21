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

export const getProducts = async (sort, order, page) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

  return res;
};

export const getProductsCount = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/products/total`);

  return res;
};

export const rateProduct = async (productId, star, authtoken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/product/rating/${productId}`,
    {
      star,
    },
    {
      headers: {
        authtoken,
      },
    }
  );

  return res;
};

export const getRelatedProducts = async (productId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/products/related/${productId}`
  );

  return res;
};

export const getProductsByCategory = async (slug) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/products/category/${slug}`
  );

  return res;
};

export const getProductsBySubcategory = async (slug) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/products/subcategory/${slug}`
  );

  return res;
};

export const getProductsByFilter = async (filters) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/search/filter`,
    filters
  );

  return res;
};
