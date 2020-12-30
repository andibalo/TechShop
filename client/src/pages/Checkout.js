import React, { useEffect, useState } from "react";
import {
  getUserCart,
  emptyCart,
  getUserAddress,
  saveUserAddress,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Input } from "antd";
import { toast } from "react-toastify";
import { EMPTY_CART } from "../reducers/actions";

const { TextArea } = Input;

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [addressExists, setAddressExists] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const loadUserAddress = async () => {
    try {
      const res = await getUserAddress(user && user.token);

      console.log(res.data);
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
    loadUserCart();
    loadUserAddress();
  }, []);

  const handleSaveAddress = async () => {
    //console.log(address);
    setLoading(true);
    try {
      const res = await saveUserAddress(user && user.token, address);

      console.log(res.data);
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
      //console.log(res.data);
      toast.success("Cart has been emptied.");
      history.push("/cart");
    } catch (error) {
      console.log(error);
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
              className="btn btn-primary mt-2"
              onClick={handleSaveAddress}
            >
              Save Address
            </button>
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
                    {i + 1}. {product.product.title} x {product.count} = Rp.{" "}
                    {product.product.price * product.count}
                  </p>
                ))}
            </div>
            <p>
              <b>Total:</b>
            </p>
            <p>Rp. {total}</p>
            <div>
              <button
                className="btn btn-primary btn-raised mr-3"
                disabled={!addressExists || !products.length}
              >
                Save Order
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
