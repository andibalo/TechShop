import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateSubcategory, getSubcategory } from "../../functions/subcategory";
import { getCategories } from "../../functions/category";
import { Spin } from "antd";

import { Link } from "react-router-dom";
import CategoryForm from "../../components/forms/CategoryForm";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  //const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [subParent, setSubParent] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();

        //console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadSubCategory = async () => {
      try {
        const res = await getSubcategory(match.params.slug, user.token);

        //console.log(res.data);
        setSubcategory(res.data.name);
        setSubParent(res.data.parent);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
    loadSubCategory();
  }, [loading]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!categoryId) {
      toast.error("Please choose parent category");
      setLoading(false);
      return;
    }

    try {
      const res = await updateSubcategory(
        {
          name: capitalize(subCategory),
          parent: categoryId,
        },
        match.params.slug,
        user.token
      );

      console.log(res);

      setLoading(false);
      setSubcategory("");
      history.push("/admin/subcategory");
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error(`Failed to update sub category, please try again later.`);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <Spin
            tip="Loading..."
            size="large"
            spinning={loading || categories.length <= 0 || !subCategory}
          >
            <h4>Update Sub-Category</h4>
            <div className="form-group">
              <label>Select Parent Category</label>
              <select
                className="form-control"
                name="category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((c) => {
                    if (c._id === subParent) {
                      setCategoryId(c._id);
                    }

                    return (
                      <option
                        key={c._id}
                        value={c._id}
                        selected={c._id === subParent}
                      >
                        {c.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              category={subCategory}
              action="Update"
              placeholder="Sub-Category Name"
              setCategory={setSubcategory}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
