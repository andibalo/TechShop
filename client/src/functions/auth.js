import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};
