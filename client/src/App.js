import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { GET_USER } from "./reducers/actions";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPassword = lazy(() => import("./pages/admin/AdminPassword"));
const CreateCategory = lazy(() => import("./pages/category/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/category/UpdateCategory"));
const SubCreate = lazy(() => import("./pages/subcategory/SubCreate"));
const SubUpdate = lazy(() => import("./pages/subcategory/SubUpdate"));
const CreateProduct = lazy(() => import("./pages/product/CreateProduct"));
const Products = lazy(() => import("./pages/product/Products"));
const UpdateProduct = lazy(() => import("./pages/product/UpdateProduct"));
const Product = lazy(() => import("./pages/Product"));
const CreateCoupon = lazy(() => import("./pages/coupon/CreateCoupon"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubcategoryHome = lazy(() =>
  import("./pages/subcategory/SubcategoryHome")
);
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));

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
            console.log("CURRENT USER", res.data);
            const { name, email, role, _id, wishlist } = res.data;

            dispatch({
              type: GET_USER,
              payload: {
                email: email,
                token: idTokenResult.token,
                role,
                name,
                id: _id,
                wishlist,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  const preloader = () => {
    return (
      <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
        <LoadingOutlined />
      </div>
    );
  };

  return (
    <Router>
      <Suspense fallback={preloader()}>
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forget/password" component={ForgotPassword} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/payment" component={Payment} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CreateCategory} />
          <AdminRoute exact path="/admin/subcategory" component={SubCreate} />
          <AdminRoute exact path="/admin/product" component={CreateProduct} />
          <AdminRoute exact path="/admin/products" component={Products} />
          <AdminRoute exact path="/admin/password" component={AdminPassword} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={UpdateProduct}
          />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={UpdateCategory}
          />
          <AdminRoute
            exact
            path="/admin/subcategory/:slug"
            component={SubUpdate}
          />
          <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/subcategory/:slug" component={SubcategoryHome} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
