import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { toast } from "react-toastify";
import { EMPTY_CART, COUPON_APPLIED } from "../reducers/actions";
import { DollarCircleOutlined } from "@ant-design/icons";
import { formatRupiah } from "../functions/product";
import { Spin } from "antd";
import { createOrder } from "../functions/user";

const StripeCheckout = ({ history }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const stripe = useStripe();
  const elements = useElements();

  const getClientSecret = async () => {
    setLoading(true);
    try {
      const res = await createPaymentIntent(user && user.token, coupon);

      console.log("Payment Intent", res.data);
      setClientSecret(res.data.clientSecret);
      setFinalAmount(res.data.finalAmount);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientSecret();
  }, []);

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setProcessing(false);
      setError(payload.error.message);

      return;
    }
    //console.log(payload);
    const res = await createOrder(user && user.token, payload);

    //console.log(res.data);
    localStorage.removeItem("isCouponApplied");
    localStorage.removeItem("cart");

    dispatch({
      type: EMPTY_CART,
    });

    dispatch({
      type: COUPON_APPLIED,
      payload: false,
    });

    setError(null);
    setProcessing(false);
    setSuccess(true);

    toast.success("Order had been successfully placed!");
    history.push("/user/history");
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);

    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      <Spin spinning={loading} size="large" tip="Loading...">
        <div className="my-4">
          <DollarCircleOutlined className="text-primary h2" />
          <p>
            Amount you have to pay is: <b>{formatRupiah(finalAmount)}</b>
          </p>
        </div>
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
          <CardElement
            id="cart-element"
            options={cartStyle}
            onChange={handleChange}
          />
          <button
            className="stripe-button"
            disabled={processing || disabled || success}
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay"
              )}
            </span>
          </button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
        </form>
      </Spin>
    </>
  );
};

export default StripeCheckout;
