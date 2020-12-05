import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
} from "../../functions/subcategory";
import { getCategories } from "../../functions/category";
import { Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/forms/CategoryForm";

const SubCreate = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [keyword, setKeyword] = useState("");

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

    const loadSubCategories = async () => {
      try {
        const res = await getSubcategories();

        //console.log(res.data);
        setSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
    loadSubCategories();
  }, [loading]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);

      try {
        const res = await deleteSubcategory(slug, user.token);

        setLoading(false);
        toast.success("Category has been deleted");
        //console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Could not delete category");
      }
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!categoryId) {
      toast.error("Please choose parent category");

      return;
    }

    try {
      const res = await createSubcategory(user.token, {
        name: capitalize(category),
        parent: categoryId,
      });

      console.log(res);

      setLoading(false);
      setCategory("");
      toast.success(`"${res.data.name}" has been created`);
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error(`Failed to create sub category, please try again later.`);
    }
  };

  //Filter Category
  //its a higher order compo that received keyword from state to return a function that has access
  //to that keyword state. The returnd function is the callback function of filter method + access to that
  //keyword state

  const filterCategory = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword);

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
            spinning={loading || categories.length <= 0}
          >
            <h4>Create Sub-Category</h4>
            <div className="form-group">
              <label>Select Parent Category</label>
              <select
                className="form-control"
                name="category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option selected disabled hidden>
                  Select
                </option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              category={category}
              action="Create"
              placeholder="Sub-Category Name"
              setCategory={setCategory}
            />
            <hr />

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search Sub-Category"
              value={keyword}
              onChange={handleSearchChange}
            />
            {subCategories &&
              subCategories
                .filter(filterCategory(keyword))
                .map((subcategory) => (
                  <div className="alert alert-secondary" key={subcategory._id}>
                    {subcategory.name}
                    <span className="btn btn-sm float-right">
                      <DeleteOutlined
                        className="text-danger"
                        onClick={() => handleRemove(subcategory.slug)}
                      />
                    </span>
                    <Link
                      to={`/admin/subcategory/${subcategory.slug}`}
                      className="btn btn-sm float-right"
                    >
                      <EditOutlined className="text-warning" />
                    </Link>
                  </div>
                ))}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
