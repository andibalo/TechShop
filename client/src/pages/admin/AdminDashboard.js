import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeOrderStatus } from "../../functions/admin";
import { useSelector } from "react-redux";

const AdminDashboard = (props) => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadOrders = async () => {
    try {
      const res = await getOrders(user && user.token);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Admin Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
