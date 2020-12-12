import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import FileUpload from "../../components/forms/FileUpload";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { createProduct } from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubcategories } from "../../functions/subcategory";
import { Select } from "antd";

const CreateProduct = (props) => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",

    subcategories: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    brand: "",
    color: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [productIsCreated, setProductIsCreated] = useState(false);
  const [loadedSubcategories, setLoadedSubcategories] = useState([]);
  const {
    title,
    description,
    price,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = formData;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        //console.log(res.data);
        setFormData({ ...formData, categories: res.data });
      } catch (error) {
        console.log(error);
      }
    };

    const loadSubcategories = async () => {
      try {
        const res = await getSubcategories();
        //console.log(res.data);
        setLoadedSubcategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
    loadSubcategories();
    setProductIsCreated(false);
  }, []);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await createProduct(formData, user.token);

      //console.log(res.data);
      toast.success("Product successfully created");
      setFormData({
        ...initialValues,
      });
      setLoading(false);
      setProductIsCreated(true);
    } catch (error) {
      console.log(error);
      toast.error("Could not create product");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value, subcategories: [] });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <Spin tip="Loading..." size="large" spinning={loading}>
            <h4>Create Product</h4>

            <FileUpload
              formData={formData}
              setFormData={setFormData}
              setLoading={setLoading}
            />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Product Title"
                  value={title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <select
                  value={shipping}
                  name="shipping"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" hidden disabled>
                    Shipping?
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <select
                  value={color}
                  name="color"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled>
                    Select Color
                  </option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select
                  value={brand}
                  name="brand"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {brands.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select
                  value={category}
                  name="category"
                  className="form-control"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              {category && (
                <div className="form-group">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Subcategory"
                    value={subcategories}
                    name="subcategories"
                    onChange={(values) =>
                      setFormData({ ...formData, subcategories: values })
                    }
                  >
                    {loadedSubcategories
                      .filter((sub) => sub.parent === category)
                      .map((sub) => (
                        <Select.Option value={sub._id} key={sub._id}>
                          {sub.name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              )}

              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
