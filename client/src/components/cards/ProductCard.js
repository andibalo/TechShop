import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AverageRating from "../AverageRating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;

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
          <>
            <ShoppingCartOutlined />
            <br />
            <p>Add To Cart</p>
          </>,
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default ProductCard;
