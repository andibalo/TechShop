import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { SEARCH_QUERY, SEARCH_PRODUCTS, LOADING } from "../../reducers/actions";
import { getProductsByFilter } from "../../functions/product";

const SearchBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  //console.log(history);

  const fetchProducts = async () => {
    dispatch({
      type: LOADING,
    });
    try {
      const res = await getProductsByFilter({ query: text });

      //console.log(res.data);

      dispatch({
        type: SEARCH_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (history.location.pathname !== "/shop") {
      history.push(`/shop?q=${text}`);

      return;
    }

    fetchProducts();
  };

  const handleChange = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: e.target.value,
    });
  };

  return (
    <form className="form-inline m-0 mr-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={handleChange}
        value={text}
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default SearchBar;
