import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";

const Password = (props) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      await auth.currentUser.updatePassword(password);

      setLoading(false);
      toast.success("Password Updated!");

      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h1>Update Password</h1>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              disabled={loading}
            />
          </div>
          <Button
            onClick={(e) => handleSubmit(e)}
            type="primary"
            loading={loading}
            size="middle"
            disabled={!password || password.length < 6}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Password;
