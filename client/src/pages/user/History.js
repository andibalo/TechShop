import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { formatRupiah } from "../../functions/product";
import PaymentInfo from "../../components/PaymentInfo";
import Invoice from "../../components/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";

const History = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadUserOrders = async () => {
    setLoading(true);
    try {
      const res = await getUserOrders(user && user.token);

      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

  const setStatusColor = (status) => {
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

  const renderOrderProducts = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Amount</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>{p.product.title}</td>
            <td>{formatRupiah(p.product.price)}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "true" ? (
                <CheckCircleOutlined className="text-primary" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPdfDownloadBtn = (order) => (
    <PDFDownloadLink
      className="btn btn-outline-primary"
      fileName="invoice.pdf"
      document={<Invoice order={order} />}
    >
      Download PDF
    </PDFDownloadLink>
  );

  const renderOrders = () => {
    return orders.map((order, i) => (
      <div key={i} className="m-4 p-3 card">
        <h5>
          Status:{" "}
          {
            <span style={{ color: setStatusColor(order.orderStatus) }}>
              {order.orderStatus}
            </span>
          }
        </h5>
        <PaymentInfo paymentInfo={order.paymentIntent} />
        {renderOrderProducts(order)}
        {renderPdfDownloadBtn(order)}
      </div>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center py-3">
          <Spin spinning={loading} tip="Loading..." size="large">
            <h4>Purchase History</h4>
            {!loading && orders.length > 0 ? (
              renderOrders()
            ) : (
              <p>No Orders Yet</p>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default History;
