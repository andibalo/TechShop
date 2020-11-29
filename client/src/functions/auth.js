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

export const currentUser = async (authToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/current-user`,

    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};

export const currentAdmin = async (authToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/current-admin`,

    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};
