import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Drawer } from "antd";
import { SET_VISIBILITY } from "../../reducers/actions";

const SideDrawer = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const imageStyles = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const showCartItems = () => {
    return cart.map((product) => (
      <div className="text-center" key={product._id}>
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0].url
              : `https://via.placeholder.com/150`
          }
          alt="image"
          style={imageStyles}
        />
        <p className="bg-secondary text-center text-light">
          {product.title} x {product.count}
        </p>
      </div>
    ));
  };

  const handleGoToCart = () => {
    dispatch({
      type: SET_VISIBILITY,
      payload: false,
    });

    history.push("/cart");
  };

  return (
    <Drawer
      className="text-center"
      placement="right"
      title="Items In Cart"
      onClose={() => {
        dispatch({
          type: SET_VISIBILITY,
          payload: false,
        });
      }}
      visible={drawer}
    >
      <div>
        {cart && cart.length > 0 && showCartItems()}

        <button
          className="btn btn-primary text-center btn-block btn-raised"
          onClick={handleGoToCart}
        >
          Go To Cart
        </button>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
