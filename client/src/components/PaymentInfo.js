import React from "react";
import { formatRupiah } from "../functions/product";

const PaymentInfo = ({ paymentInfo }) => {
  return (
    <div className="text-left d-flex mt-3">
      <p className="mr-3">
        <b>Order Id:</b> {paymentInfo.id}
      </p>
      <p className="mr-3">
        <b>Ordered On:</b>{" "}
        {new Date(paymentInfo.created * 1000).toLocaleString()}
      </p>
      <p className="mr-3">
        <b>Total Paid:</b> {formatRupiah(paymentInfo.amount)}
      </p>
      <p>
        <b>Currency:</b> {paymentInfo.currency.toUpperCase()}
      </p>
    </div>
  );
};

export default PaymentInfo;
