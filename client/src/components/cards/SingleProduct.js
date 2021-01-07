import React, { useState } from "react";
import {
  ADD_TO_CART,
  SET_VISIBILITY,
  USER_WISHLIST,
} from "../../reducers/actions";
import { Card, Tabs, Tooltip } from "antd";

import {
  HeartOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../Modal/RatingModal";
import { toast } from "react-toastify";
import AverageRating from "../AverageRating";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeWishlist } from "../../functions/user";

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

  const handleAddToWishlist = async () => {
    try {
      let res;

      if (user && user.wishlist.indexOf(_id) !== -1) {
        res = await removeWishlist(user && user.token, _id);
      } else {
        res = await addToWishlist(user && user.token, _id);
      }

      //console.log(res.data);

      dispatch({
        type: USER_WISHLIST,
        payload: res.data.wishlist,
      });
    } catch (error) {
      console.log(error);
    }
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
            <span onClick={handleAddToWishlist}>
              {user && user.wishlist.indexOf(_id) !== -1 ? (
                <HeartFilled className="text-danger" />
              ) : (
                <HeartOutlined className="text-danger" />
              )}

              <br />
              <p>
                {user && user.wishlist.indexOf(_id) !== -1
                  ? "Remove From Wishlist"
                  : "Add To Wishlist"}
              </p>
            </span>,
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
