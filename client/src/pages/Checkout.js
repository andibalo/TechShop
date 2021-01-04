import React, { useEffect, useState } from "react";
import {
  getUserCart,
  emptyCart,
  getUserAddress,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Input } from "antd";
import { toast } from "react-toastify";
import { EMPTY_CART, COUPON_APPLIED } from "../reducers/actions";
import { formatRupiah } from "../functions/product";

const { TextArea } = Input;

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [addressExists, setAddressExists] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const loadUserAddress = async () => {
    try {
      const res = await getUserAddress(user && user.token);

      //console.log(res.data);
      setAddress(res.data.address);

      if (res.data.address !== "") {
        setAddressExists(true);
      }
      //console.log("test");
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserCart = async () => {
    setLoading(true);
    try {
      //console.log(user.token);
      const res = await getUserCart(user && user.token);

      //console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("isCouponApplied", false);
    dispatch({
      type: COUPON_APPLIED,
      payload: false,
    });
    loadUserCart();
    loadUserAddress();
  }, []);

  const handleSaveAddress = async () => {
    //console.log(address);
    setLoading(true);
    try {
      const res = await saveUserAddress(user && user.token, address);

      //console.log(res.data);
      setAddressExists(true);
      setLoading(false);
      toast.success("Address has been saved.");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEmptyCart = async () => {
    localStorage.removeItem("cart");

    dispatch({
      type: EMPTY_CART,
    });

    try {
      const res = await emptyCart(user && user.token);

      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setDiscount(0);
      //console.log(res.data);
      toast.success("Cart has been emptied.");
      history.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyCoupon = async () => {
    //console.log("COUPON", coupon);
    setLoading(true);
    try {
      const res = await applyCoupon(user && user.token, coupon);

      if (res.data.code === 1050) {
        toast.error("Coupon code is not valid");
        setLoading(false);
        return;
      }

      localStorage.setItem("isCouponApplied", true);

      console.log(res.data);
      setTotalAfterDiscount(res.data.total);
      setDiscount(res.data.discount);
      dispatch({
        type: COUPON_APPLIED,
        payload: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      <Spin spinning={loading} tip="Loading..." size="large">
        <div className="row">
          <div className="col-md-6">
            <h4>Delivery Address</h4>
            <TextArea
              rows={10}
              showCount
              maxLength={1000}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              allowClear={true}
              style={{ resize: "none" }}
            />
            <button
              disabled={address === ""}
              className="btn btn-outline-primary mt-2"
              onClick={handleSaveAddress}
            >
              Save Address
            </button>
            <div className="mt-4">
              <h4>Got Coupon?</h4>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="form-control"
              />
              <button
                disabled={!coupon}
                onClick={handleApplyCoupon}
                className="btn btn-outline-primary mt-3"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Order Summary</h4>
            <p>
              <b>Products:</b>
            </p>
            <div>
              {!loading &&
                products.length > 0 &&
                products.map((product, i) => (
                  <p key={i}>
                    {i + 1}. {product.product.title} x {product.count} ={" "}
                    {formatRupiah(product.product.price * product.count)}
                  </p>
                ))}
            </div>
            <p>
              <b>Total:</b>
            </p>
            <p>
              Rp.{" "}
              <span
                style={{
                  textDecoration:
                    totalAfterDiscount > 0 ? "line-through" : "initial",
                }}
              >
                {total}
              </span>
              {totalAfterDiscount > 0 && (
                <span className="ml-1">{totalAfterDiscount}</span>
              )}
            </p>
            {totalAfterDiscount > 0 && discount > 0 && (
              <p>
                <small className="text-danger">
                  {discount}% Discount Applied!
                </small>
              </p>
            )}
            <div>
              <button
                className="btn btn-primary btn-raised mr-3"
                disabled={!addressExists || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>

              <button
                disabled={!products.length}
                onClick={handleEmptyCart}
                className="btn btn-outline-primary btn-raised"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Checkout;
