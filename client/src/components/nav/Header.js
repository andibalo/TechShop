import React, { useState } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
const { Item, SubMenu } = Menu

const Header = () => {

    const [current, setCurrent] = useState('home')



    const handleClick = e => {

        setCurrent(e.key)
    }


    return (

        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>


            <SubMenu key="account" className="float-right" icon={<UserOutlined />} title="User">

                <Menu.Item key="account:1">
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="account:2">
                    <Link to="/login">Login</Link>
                </Menu.Item>


            </SubMenu>

        </Menu>
    )
}

export default Header