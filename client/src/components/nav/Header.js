import React, { useState } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { LOG_OUT } from '../../reducers/actions'

const Header = () => {

    const { Item, SubMenu } = Menu

    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch()
    const history = useHistory()


    const handleClick = e => {

        setCurrent(e.key)
    }

    const logout = e => {
        auth.signOut()

        dispatch({
            type: LOG_OUT,
            payload: null
        })

        history.push('/login')
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
                <Menu.Item key="account:3" icon={<LogoutOutlined />} onClick={logout}>
                    Logout
                </Menu.Item>


            </SubMenu>

        </Menu>
    )
}

export default Header