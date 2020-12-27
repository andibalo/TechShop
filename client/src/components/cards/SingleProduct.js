import React, { useState } from "react";
import { ADD_TO_CART, SET_VISIBILITY } from "../../reducers/actions";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../Modal/RatingModal";
import { toast } from "react-toastify";
import AverageRating from "../AverageRating";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = Tabs;

const SingleProduct = ({
  product,
  onStarClick,
  star,
  submitRating,
  isLoading,
}) => {
  const { title, images, description, _id, ratings } = product;

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
    <>
      <div className="col-md-7">
        <Carousel showArrows infiniteLoop>
          {images &&
            images.map((image) => (
              <img src={image.url} key={image.public_id} />
            ))}
        </Carousel>
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More Info" key="2">
            More info...
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h2 className="bg-info p-3">{title}</h2>
        {!isLoading && product && ratings ? (
          <AverageRating product={product} />
        ) : (
          <p>No Reviews yet</p>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <span onClick={handleAddToCart}>
                <ShoppingCartOutlined />

                <br />
                <p>Add To Cart</p>
              </span>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-danger" />
              <br />
              <p>Add To Wishlist</p>
            </Link>,
            <RatingModal submitRating={submitRating}>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={(newRating, name) => onStarClick(newRating, name)}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductInfo product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
