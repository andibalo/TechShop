import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from "../../functions/subcategory";
import { Spin } from "antd";

const SubcategoryList = (props) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSubcategories = async () => {
    setLoading(true);
    try {
      const res = await getSubcategories();
      //console.log(res.data);
      setSubcategories(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubcategories();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="row py-4">
        {!loading &&
          subcategories.length > 0 &&
          subcategories.map((subcategory) => (
            <div
              key={subcategory._id}
              className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
              <Link to={`/subcategory/${subcategory.slug}`}>
                {subcategory.name}
              </Link>
            </div>
          ))}
      </div>
    </Spin>
  );
};

export default SubcategoryList;
