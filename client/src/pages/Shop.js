import React, { useState, useEffect } from "react";
import { Spin, Menu, Slider, Checkbox } from "antd";
import { SEARCH_PRODUCTS, SEARCH_QUERY } from "../reducers/actions";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubcategories } from "../functions/subcategory";
import ProductCard from "../components/cards/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import FilterStar from "../components/FilterStar";

const { SubMenu } = Menu;

const Shop = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOK] = useState(false);
  const [categoryEffect, setCategoryEffect] = useState(false);
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

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSubcategories = async () => {
    try {
      const res = await getSubcategories();
      setSubcategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProductsWithFilter = async (filters) => {
    try {
      const res = await getProductsByFilter(filters);

      //console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
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

    loadCategories();
    loadSubcategories();
  }, []);

  useEffect(() => {
    setProducts(productsRedux);
  }, [productsRedux]);

  useEffect(() => {
    loadProductsWithFilter({ price });
  }, [ok]);

  useEffect(() => {
    loadProductsWithFilter({ category: [...categoriesId] });
  }, [categoryEffect]);

  const resetFilter = (currentFilter) => {
    if (currentFilter !== "search") {
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: "",
      });
    }

    if (currentFilter !== "category") {
      setCategoriesId([]);
    }

    if (currentFilter !== "price") {
      setPrice([0, 0]);
    }

    return;
  };

  const handleSlider = (value) => {
    resetFilter("price");
    dispatch({
      type: SEARCH_QUERY,
      payload: "",
    });

    setPrice(value);

    setTimeout(() => {
      setOK(!ok);
    }, 300);
  };

  const handleCheckbox = (e) => {
    resetFilter("category");
    const newCategoriesId = [...categoriesId];
    const categoryIdIndex = newCategoriesId.indexOf(e.target.value);

    if (categoryIdIndex === -1) {
      newCategoriesId.push(e.target.value);
    } else {
      newCategoriesId.splice(categoryIdIndex, 1);
    }

    setCategoriesId(newCategoriesId);
    setCategoryEffect(!categoryEffect);
  };

  const handleStarClick = (rating) => {
    //console.log(rating);
    resetFilter("all");

    loadProductsWithFilter({ stars: rating });
  };

  const handleSubcategory = (subcategory) => {
    resetFilter("all");
    loadProductsWithFilter({ subcategory });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="mx-4"
                  tipFormatter={(v) => `Rp. ${v}`}
                  range
                  value={price}
                  onChange={(value) => handleSlider(value)}
                  max="5000"
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <div key={category._id} className="mx-4">
                      <Checkbox
                        value={category._id}
                        className="py-2"
                        onChange={handleCheckbox}
                        checked={categoriesId.includes(category._id)}
                      >
                        {category.name}
                      </Checkbox>
                    </div>
                  ))}
              </div>
            </SubMenu>
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div className="mx-4">
                <FilterStar
                  handleStarClick={handleStarClick}
                  numberOfStars={5}
                />
                <br />
                <FilterStar
                  handleStarClick={handleStarClick}
                  numberOfStars={4}
                />
                <br />
                <FilterStar
                  handleStarClick={handleStarClick}
                  numberOfStars={3}
                />
                <br />
                <FilterStar
                  handleStarClick={handleStarClick}
                  numberOfStars={2}
                />
                <br />
                <FilterStar
                  handleStarClick={handleStarClick}
                  numberOfStars={1}
                />
              </div>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div className="mx-3">
                {subcategories.length > 0 &&
                  subcategories.map((subcategory) => (
                    <div
                      style={{ cursor: "pointer" }}
                      key={subcategory._id}
                      className="m-1 p-1  badge badge-secondary"
                      onClick={() => handleSubcategory(subcategory)}
                    >
                      {subcategory.name}
                    </div>
                  ))}
              </div>
            </SubMenu>
          </Menu>
        </div>
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
