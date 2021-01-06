import React from "react";
import PaymentInfo from "./PaymentInfo";
import { Select } from "antd";
import { setStatusColor } from "../functions/admin";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { formatRupiah } from "../functions/product";

const { Option } = Select;

const Order = ({ orders, handleStatusChange }) => {
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

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className=" my-4 p-3 card">
          <h4 className="text-center">
            Status:{" "}
            <span style={{ color: setStatusColor(order.orderStatus) }}>
              {order.orderStatus}
            </span>
          </h4>
          <PaymentInfo paymentInfo={order.paymentIntent} />

          <div className="mb-4">
            <p>Change Order Status:</p>
            <Select
              defaultValue={order.orderStatus}
              onChange={(value) => handleStatusChange(order._id, value)}
            >
              <Option value="Not Processed">Not Processed</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Dispatched">Dispatched</Option>
              <Option value="Cancelled">Cancelled</Option>
              <Option value="Compeleted">Completed</Option>
            </Select>
          </div>
          {renderOrderProducts(order)}
        </div>
      ))}
    </>
  );
};

export default Order;
