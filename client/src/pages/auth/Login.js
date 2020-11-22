import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { GET_USER } from "../../reducers/actions";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadings, setLoadings] = useState([false, false]);

  const dispatch = useDispatch();

  const googleLogin = async (index) => {
    let newLoadings = [...loadings];
    newLoadings[index] = true;
    setLoadings(newLoadings);

    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: GET_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push("/");
    } catch (error) {
      console.log(error);

      setLoadings([false, false]);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (index) => {
    let newLoadings = [...loadings];
    newLoadings[index] = true;
    setLoadings(newLoadings);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: GET_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push("/");
    } catch (error) {
      console.log(error);

      setLoadings([false, false]);

      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <Button
              type="primary"
              className="my-2"
              shape="round"
              size="large"
              block
              onClick={(e) => handleSubmit(0)}
              loading={loadings[0]}
              icon={<MailOutlined />}
              disabled={!email || password.length < 6}
            >
              Login with email/password
            </Button>
            <Button
              type="danger"
              shape="round"
              size="large"
              block
              loading={loadings[1]}
              onClick={(e) => googleLogin(1)}
              icon={<GoogleOutlined />}
            >
              Login with Google
            </Button>
            <Link
              to="/forget/password"
              className="my-3 float-right text-danger"
            >
              Forgot Password ?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
