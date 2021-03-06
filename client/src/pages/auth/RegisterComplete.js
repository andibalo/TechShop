import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { GET_USER } from "../../reducers/actions";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password is required!");
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
    }

    try {
      //sign in the user with only email
      //the email link exists as param when user clicks the link in the email
      //the result is the user obj from firebase
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //if user exists delete key from local storage
        //update the password in user obj, get the user token to access protected routes and then redirect
        window.localStorage.removeItem("emailForRegistration");

        let user = auth.currentUser;

        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            const { name, email, role, _id } = res.data;

            dispatch({
              type: GET_USER,
              payload: {
                email: email,
                token: idTokenResult.token,
                role,
                name,
                id: _id,
              },
            });
          })
          .catch();

        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="submit"
              className="btn btn-raised my-3"
              value="Register"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
