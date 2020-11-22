import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { LOG_OUT } from "../../reducers/actions";

const Header = () => {
  const { Item, SubMenu } = Menu;

  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

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
            <Menu.Item key="account:1">
              <Link to="/">Link</Link>
            </Menu.Item>
            <Menu.Item key="account:2">
              <Link to="/">Link</Link>
            </Menu.Item>
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
    </Menu>
  );
};

export default Header;
