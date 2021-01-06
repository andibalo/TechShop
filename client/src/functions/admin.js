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
  const res = await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );

  return res;
};

export const setStatusColor = (status) => {
  switch (true) {
    case status === "Not Processed":
      return "#87827e";
    case status === "Processing":
      return "#f2a622";
    case status === "Dispatched":
      return "#f0ec1d";
    case status === "Cancelled":
      return "#ed3b13";
    case status === "Compeleted":
      return "#12db37";
    default:
      return "initial";
  }
};
