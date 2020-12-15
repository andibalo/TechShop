import React, { useState, useEffect } from "react";
import { getProductsBySubcategory } from "../../functions/product";
import { Spin } from "antd";
import ProductCard from "../../components/cards/ProductCard";

const SubcategoryHome = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState({});
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsBySubcategory(match.params.slug);

      //console.log(res.data);
      setSubcategory(res.data.subcategory);
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
              {products.length} Products in "{subcategory.name}" subcategory
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

export default SubcategoryHome;
