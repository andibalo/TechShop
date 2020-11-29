import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          //console.log(res);

          setIsAdmin(true);
        })
        .catch((err) => {
          //console.log(err);

          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? (
    <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default AdminRoute;
