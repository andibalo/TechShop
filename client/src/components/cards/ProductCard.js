import React, { useState } from "react";
import { ADD_TO_CART, SET_VISIBILITY } from "../../reducers/actions";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AverageRating from "../AverageRating";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { formatRupiah } from "../../functions/product";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;

  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    if (cart.filter((item) => item._id === product._id).length > 0) {
      toast.error("Product already exists in cart");
      return;
    }

    cart.push({
      ...product,
      count: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setTooltip("Added");
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });

    dispatch({
      type: SET_VISIBILITY,
      payload: true,
    });
  };

  return (
    <div>
      <div className="text-center">
        <AverageRating product={product} />
      </div>

      <Card
        cover={
          <img
            src={images.length > 0 && images[0].url}
            style={{ height: "300px", objectFit: "cover" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined />
            <br />
            <p>View Product</p>
          </Link>,
          <Tooltip title={tooltip}>
            <span onClick={handleAddToCart}>
              <ShoppingCartOutlined />

              <br />
              <p>Add To Cart</p>
            </span>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ${formatRupiah(price)}`}
          description={description}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
