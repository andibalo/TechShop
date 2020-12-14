import React, { useEffect, useState } from "react";
import {
  getProduct,
  rateProduct,
  getRelatedProducts,
} from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;
  const [star, setStar] = useState(0);

  const { _id } = product;

  const { user } = useSelector((state) => ({ ...state }));

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await getProduct(slug);

      setProduct(res.data);

      const relatedProductsRes = await getRelatedProducts(res.data._id);
      //console.log(relatedProductsRes);
      setRelatedProducts(relatedProductsRes.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const userRating = product.ratings.find(
        (rating) => rating.postedBy === user.id
      );

      userRating && setStar(userRating.star);
    }
  }, [product, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
  };

  const submitRating = async () => {
    try {
      const res = await rateProduct(_id, star, user.token);

      loadProduct();
    } catch (error) {
      console.log(error);
    }
  };

  //IMPORTANT
  //state that needs to be in children compnent has to be controlled in the parent component
  //bcs if children component controls its own state the parent component will not synchronize with the changes
  //in the child component
  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row py-5">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
            submitRating={submitRating}
            isLoading={loading}
          />
        </div>
        <div className="row py-5">
          <div className="col text-center">
            <hr />
            <h3>Related Products</h3>
            <hr />
          </div>
        </div>
        <div className="row pb-5">
          {relatedProducts ? (
            relatedProducts.map((product) => (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col">
              <p>No Products Found</p>
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default Product;
