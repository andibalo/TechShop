import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Cart = (props) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <h4>Cart</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            "show items"
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>

          <p>Products:</p>
          {cart.length > 0 &&
            cart.map((item) => (
              <div>
                <p>
                  {item.title} x {item.count} = Rp. {item.price * item.count}
                </p>
              </div>
            ))}
          <hr />
          <p>Total: </p>
          <hr />
          {user && user.token ? (
            <button className="btn btn-sm btn-primary mt-2">
              Proceed To Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              Login to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
