import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { Spin } from "antd";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await getProduct(slug);

      console.log(res.data);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row py-5">
          <SingleProduct product={product} />
        </div>
        <div className="row py-5">
          <div className="col text-center">
            <h3>Related Products</h3>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Product;
