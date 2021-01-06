import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector, useDispatch } from "react-redux";
import { getUserWishlist, removeWishlist } from "../../functions/user";
import { USER_WISHLIST } from "../../reducers/actions";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const Wishlist = (props) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await getUserWishlist(user && user.token);

      //console.log(res.data);
      setWishlist(res.data.wishlist);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemoveWishlist = async (productId) => {
    try {
      const res = await removeWishlist(user && user.token, productId);

      //console.log(res.data);

      dispatch({
        type: USER_WISHLIST,
        payload: res.data.wishlist,
      });

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <Spin spinning={loading} size="large" tip="Loading...">
            <h4>Wishlist</h4>
            {!loading && wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div key={product._id} className="alert alert-secondary">
                  <Link to={`/product/${product.slug}`}>{product.title}</Link>
                  <span
                    className="btn btn-sm float-right"
                    onClick={(e) => handleRemoveWishlist(product._id)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              ))
            ) : (
              <p>Nothing in wishlist yet.</p>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
