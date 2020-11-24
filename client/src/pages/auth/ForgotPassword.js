import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const sendResetPassword = async () => {
    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URI,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);

      setLoading(false);
      toast.success(`Password reset link sent to ${email}`);
      setEmail("");
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Forget Password</h3>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            size="large"
            shape="round"
            disabled={!email}
            onClick={sendResetPassword}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
