import React, { useState, useEffect } from "react";
import { getProductsByCategory } from "../../functions/product";
import { Spin } from "antd";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsByCategory(match.params.slug);

      //console.log(res.data);
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          </div>
        </div>
        <div className="row pb-5">
          {products.length > 0 &&
            products.map((product) => (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </Spin>
  );
};

export default CategoryHome;
