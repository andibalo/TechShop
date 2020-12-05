import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/categories`);

  return res;
};

export const updateCategory = async (name, slug, authToken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    {
      name,
    },
    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};

export const getCategory = async (slug, authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: { authtoken },
  });

  return res;
};

export const deleteCategory = async (slug, authToken) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API}/category/${slug}`,

    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};

export const createCategory = async (authToken, category) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/category`,
    category,
    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};
