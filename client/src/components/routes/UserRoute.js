import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Redirect to="/login"></Redirect>
  );
};

export default UserRoute;
