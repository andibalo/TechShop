import axios from "axios";

export const getSubcategories = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/subcategories`);

  return res;
};

export const updateSubcategory = async (data, slug, authToken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    data,
    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};

export const getSubcategory = async (slug, authtoken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    {
      headers: { authtoken },
    }
  );

  return res;
};

export const deleteSubcategory = async (slug, authToken) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,

    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};

export const createSubcategory = async (authToken, subcategory) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/subcategory`,
    subcategory,
    {
      headers: {
        authtoken: authToken,
      },
    }
  );

  return res;
};
