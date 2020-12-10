import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import FileUpload from "../../components/forms/FileUpload";
import { getProduct, updateProduct } from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubcategories } from "../../functions/subcategory";
import { toast } from "react-toastify";
import { Spin, Select } from "antd";
import { useSelector } from "react-redux";

const UpdateProduct = ({ match, history }) => {
  const initialValues = {
    title: "",
    description: "",
    price: "",
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

  const [product, setProduct] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [loadedSubcategories, setLoadedSubcategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [defaultSubcategory, setDefaultSubcategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const {
    title,
    description,
    price,

    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = product;

  const { user } = useSelector((state) => ({ ...state }));

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await getProduct(match.params.slug);

      console.log(res.data);

      setProduct({ ...product, ...res.data });
      setDefaultSubcategory(res.data.subcategories.map((sub) => sub._id));
      setNewCategory(res.data.category._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load product");
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      console.log(res.data);
      setLoadedCategories(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  const loadSubcategories = async () => {
    try {
      const res = await getSubcategories();
      console.log(res.data);
      setLoadedSubcategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
    loadSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await updateProduct(
        {
          ...product,
          category: newCategory,
          subcategories: defaultSubcategory,
        },
        user.token,
        match.params.slug
      );

      //console.log(res);
      setLoading(false);
      history.push("/admin/products");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to update product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);

    if (e.target.value === category._id) {
      setDefaultSubcategory(subcategories.map((sub) => sub._id));

      return;
    }

    setDefaultSubcategory([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <Spin tip="Loading..." size="large" spinning={loading}>
            <h4>Update Product</h4>
            <FileUpload
              formData={product}
              setFormData={setProduct}
              setLoading={setLoading}
            />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
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
                <label>Description</label>
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
                <label>Price</label>
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
                <label>Shipping</label>
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
                <label>Price</label>
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
                <label>Color</label>
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
                <label>Brand</label>
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
                <label>Category</label>

                <select
                  value={newCategory}
                  name="category"
                  className="form-control"
                  onChange={(e) => handleCategoryChange(e)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {loadedCategories.length > 0 &&
                    loadedCategories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              {category && (
                <div className="form-group">
                  <label>Subcategories</label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Subcategory"
                    name="subcategories"
                    value={defaultSubcategory}
                    onChange={(values) =>
                      //setProduct({ ...product, subcategories: values })
                      setDefaultSubcategory(values)
                    }
                  >
                    {loadedSubcategories
                      .filter((sub) => sub.parent === newCategory)
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

export default UpdateProduct;
