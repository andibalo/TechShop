import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../functions/category";
import { Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/forms/CategoryForm";

const CreateCategory = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
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

    loadCategories();
  }, [loading]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);

      try {
        const res = await deleteCategory(slug, user.token);

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

    try {
      const res = await createCategory(user.token, {
        name: capitalize(category),
      });

      console.log(res);

      setLoading(false);
      setCategory("");
      toast.success(`"${res.data.name}" has been created`);
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error(`Failed to create category, please try again later.`);
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
            <h4>Create Category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              category={category}
              placeholder="Category Name"
              action="Create"
              setCategory={setCategory}
            />
            <hr />
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search Category"
              value={keyword}
              onChange={handleSearchChange}
            />
            {categories &&
              categories.filter(filterCategory(keyword)).map((category) => (
                <div className="alert alert-secondary" key={category._id}>
                  {category.name}
                  <span className="btn btn-sm float-right">
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleRemove(category.slug)}
                    />
                  </span>
                  <Link
                    to={`/admin/category/${category.slug}`}
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

export default CreateCategory;
