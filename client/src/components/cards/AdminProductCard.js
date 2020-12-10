import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          src={images.length > 0 && images[0].url}
          style={{ height: "300px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined onClick={() => handleRemove(slug)} />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
