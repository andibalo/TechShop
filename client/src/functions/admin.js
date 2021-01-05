import axios from "axios";

export const getOrders = async (authToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/admin/orders`,

    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};

export const changeOrderStatus = async (authToken, orderId, orderStatus) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/admin/orders`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};
