import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import axios from "axios";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.count;
    }, 0);
  };

  const saveUserCartItems = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
          headers: {
            authtoken: user.token,
          },
        }
      );

      //console.log(res);
      if (res.status === 200) {
        history.push("/checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedCheckout = () => {
    saveUserCartItems();
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container-fluid py-3">
      <div className="row">
        <div className="col">
          <h4>Cart</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>

          <p>Products:</p>
          {cart.length > 0 &&
            cart.map((item, index) => (
              <div key={item._id}>
                <p>
                  {index + 1}. {item.title} x {item.count} = Rp.
                  {item.price * item.count}
                </p>
              </div>
            ))}
          <hr />
          <p>
            Total: <b>Rp. {getTotal()}</b>
          </p>
          <hr />
          {user && user.token ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
              onClick={handleProceedCheckout}
            >
              Proceed To Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    from: "/cart",
                  },
                }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
