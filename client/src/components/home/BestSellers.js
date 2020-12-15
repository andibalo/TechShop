import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import { Pagination } from "antd";

const BestSellers = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts("sold", "desc", page);

      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
      .then((res) => {
        setProductsCount(res.data);
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row py-5">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div key={product._id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              );
            })}
          <div className="col-md-12 text-center py-3">
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellers;
