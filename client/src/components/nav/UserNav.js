import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history">History</Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password">Password</Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishlist">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
