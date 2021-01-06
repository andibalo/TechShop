import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeOrderStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import Order from "../../components/Order";
import { toast } from "react-toastify";

import PaymentInfo from "../../components/PaymentInfo";
import { Spin } from "antd";

const AdminDashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders(user && user.token);

      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(
        user && user.token,
        orderId,
        orderStatus
      );

      console.log(res.data);
      toast.success("Order status updated!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <Spin size="large" spinning={loading} tip="Loading...">
            <h4>Orders</h4>
            {!loading && orders.length > 0 ? (
              <Order orders={orders} handleStatusChange={handleStatusChange} />
            ) : (
              <p>No Orders Yet</p>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
