import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../Modal/RatingModal";
import AverageRating from "../AverageRating";

const { TabPane } = Tabs;

const SingleProduct = ({
  product,
  onStarClick,
  star,
  submitRating,
  isLoading,
}) => {
  const { title, images, description, _id, ratings } = product;

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
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              <p>Add To Cart</p>
            </>,
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
