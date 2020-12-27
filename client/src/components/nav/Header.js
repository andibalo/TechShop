import React, { useState } from "react";
import { Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { LOG_OUT, SET_VISIBILITY } from "../../reducers/actions";
import SearchBar from "../forms/SearchBar";

const Header = () => {
  const { Item, SubMenu } = Menu;

  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = (e) => {
    auth.signOut();

    dispatch({
      type: LOG_OUT,
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart && cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      <span className="float-right">
        <button
          onClick={() => {
            dispatch({
              type: SET_VISIBILITY,
              payload: true,
            });
          }}
          className="btn btn-primary mx-2"
        >
          View Cart
        </button>
      </span>
      {!user && (
        <React.Fragment>
          <Item key="register" icon={<UserOutlined />} className="float-right">
            <Link to="/register">Register</Link>
          </Item>
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <SubMenu
            key="account"
            className="float-right"
            icon={<UserOutlined />}
            title="User"
          >
            {user && user.role === "admin" && (
              <Menu.Item key="account:1">
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
            )}
            {user && user.role !== "admin" && (
              <Menu.Item key="account:2">
                <Link to="/user/history">Dashboard</Link>
              </Menu.Item>
            )}

            <Menu.Item
              key="account:3"
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </React.Fragment>
      )}
      <span className="float-right">
        <SearchBar />
      </span>
    </Menu>
  );
};

export default Header;
