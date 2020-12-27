import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../reducers/actions";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const cart = localStorage.getItem("cart")
      ? [...JSON.parse(localStorage.getItem("cart"))]
      : [];

    cart.forEach((item, i) => {
      if (product._id === item._id) {
        cart[i].count = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const handleRemoveItem = () => {
    const cart = localStorage.getItem("cart")
      ? [...JSON.parse(localStorage.getItem("cart"))]
      : [];

    cart.forEach((item, i) => {
      if (product._id === item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  return (
    <tr>
      <td>
        {product.images.length > 0 ? (
          <div style={{ width: "100px", height: "auto" }}>
            <ModalImage
              small={product.images[0].url}
              large={product.images[0].url}
            />
          </div>
        ) : (
          <p>No Image</p>
        )}
      </td>
      <td>{product.title}</td>
      <td>Rp. {product.price}</td>
      <td>{product.brand}</td>
      <td>{product.color}</td>
      <td>
        <input
          type="number"
          min="1"
          max={`${product.quantity}`}
          className="form-control"
          value={product.count}
          onChange={handleQuantityChange}
        />
        <p className="text-secondary">
          <small>In Stock: {product.quantity}</small>
        </p>
      </td>
      <td className="text-center">
        {product.shipping === "true" ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        )}
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleRemoveItem}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
