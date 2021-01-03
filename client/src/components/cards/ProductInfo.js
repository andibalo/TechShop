import React from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "../../functions/product";

const ProductInfo = ({ product }) => {
  const {
    price,
    category,
    subcategories,
    shipping,
    color,
    brand,
    sold,
    quantity,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        {price && (
          <span className="label label-defaul label-pill pull-xs-right">
            {formatRupiah(price)}
          </span>
        )}
      </li>
      <li className="list-group-item">
        Category
        {category && (
          <Link
            to={`/category/${category.slug}`}
            className="label label-defaul label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        )}
      </li>
      <li className="list-group-item">
        Subcategories
        {subcategories &&
          subcategories.map((sub) => (
            <Link
              to={`/subcategory/${sub.slug}`}
              key={sub._id}
              className="label label-defaul label-pill pull-xs-right"
            >
              {sub.name}
            </Link>
          ))}
      </li>
      <li className="list-group-item">
        Shipping
        <span className="label label-defaul label-pill pull-xs-right">
          {shipping === "true" ? "Yes" : "No"}
        </span>
      </li>
      <li className="list-group-item">
        Color
        <span className="label label-defaul label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Brand
        <span className="label label-defaul label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        Available
        <span className="label label-defaul label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold
        <span className="label label-defaul label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfo;
