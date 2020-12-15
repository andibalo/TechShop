import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { Spin } from "antd";

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      //console.log(res.data);
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="row py-4">
        {!loading &&
          categories.length > 0 &&
          categories.map((category) => (
            <div
              key={category._id}
              className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </div>
          ))}
      </div>
    </Spin>
  );
};

export default CategoryList;
