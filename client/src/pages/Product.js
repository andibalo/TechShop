import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  const loadProduct = async () => {
    try {
      const res = await getProduct(slug);

      console.log(res.data);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);

  return <div>Product page</div>;
};

export default Product;
