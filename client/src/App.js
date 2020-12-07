import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/category/CreateCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import SubCreate from "./pages/subcategory/SubCreate";
import SubUpdate from "./pages/subcategory/SubUpdate";
import CreateProduct from "./pages/product/CreateProduct";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { GET_USER } from "./reducers/actions";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //onAuthStactChange is an observer that returns the user obj that is logged in to firebase

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        //console.log(idTokenResult.token);
        currentUser(idTokenResult.token)
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
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forget/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CreateCategory} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/subcategory" component={SubCreate} />
        <AdminRoute
          exact
          path="/admin/subcategory/:slug"
          component={SubUpdate}
        />
        <AdminRoute exact path="/admin/product" component={CreateProduct} />
      </Switch>
    </Router>
  );
};

export default App;
