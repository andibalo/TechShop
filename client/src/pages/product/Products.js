import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../functions/product";
import { Spin } from "antd";
import { toast } from "react-toastify";
import AdminProductCard from "../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsByCount(100);

      //console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRemove = async (slug) => {
    if (window.confirm("Delete Product?")) {
      setLoading(true);

      try {
        const res = await removeProduct(slug, user.token);

        console.log(res.data);

        setLoading(false);
        toast.success("Product has been deleted");
        getProducts();
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <Spin spinning={loading} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            <h4>All Products</h4>
            <div className="row">
              {products.map((product) => (
                <div className="col-md-4" key={product._id}>
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Products;
