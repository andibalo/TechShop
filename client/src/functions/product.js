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
