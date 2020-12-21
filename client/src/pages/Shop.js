import React, { useState, useEffect } from "react";
import { Spin, Menu, Slider } from "antd";
import { SEARCH_PRODUCTS } from "../reducers/actions";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Shop = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { products: productsRedux, loading: loadingRedux } = search;

  const queryParams = new URLSearchParams(location.search);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsByCount(12);

      dispatch({
        type: SEARCH_PRODUCTS,
        payload: null,
      });
      //console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!queryParams.has("q")) {
      loadProducts();
    } else {
      getProductsByFilter({ query: queryParams.get("q") })
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
          queryParams.delete("q");
          history.replace({
            search: queryParams.toString(),
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    setProducts(productsRedux);
  }, [productsRedux]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">Search Filters</div>
        <div className="col-md-9  py-5">
          <Spin
            spinning={loading || loadingRedux}
            tip="Loading..."
            size="large"
          >
            <h3 className="text-danger mb-4">Products</h3>
            <div className="row">
              {!loading &&
                products &&
                products.map((product) => (
                  <div key={product._id} className="col-md-4">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Shop;
