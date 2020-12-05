import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../functions/category";
import { Spin } from "antd";
import CategoryForm from "../../components/forms/CategoryForm";

const UpdateCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategory = async (slug, authtoken) => {
      setLoading(true);

      try {
        const res = await getCategory(slug, authtoken);

        //console.log(res);
        setCategory(res.data.name);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    //console.log(user);

    if (user) {
      loadCategory(match.params.slug, user.token);
    }
  }, [user]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(user);
    try {
      await updateCategory(capitalize(category), match.params.slug, user.token);

      setLoading(false);
      setCategory("");
      history.push("/admin/category");
    } catch (error) {
      console.log(error);

      setLoading(false);
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
            spinning={loading || (!category && !user)}
          >
            <h4>Update Category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              setCategory={setCategory}
              category={category}
              action="Update"
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
