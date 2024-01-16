// \chicken-website\src\components\Navbar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { token } = useAuth();
  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPhone, Setphoneview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      Setphoneview(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("not logged in:", error);
    }
  });

  const handleItemClick = (path) => {
    navigate(path);
  };

  const logoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        {isPhone ? (
          <li>
            <a>Menu</a>
            <NavList handleItemClick={handleItemClick} />
          </li>
        ) : (
          <NavList handleItemClick={handleItemClick} />
        )}
        {isLoggedIn ? (
          <li>
            <Link className="bi bi-person-circle login" to="/Profile">
              <a>Profile</a>
            </Link>

            <ul className="list-items">
              <li onClick={() => handleItemClick("/order-history")}>
                <a>Order History</a>
              </li>
              <li onClick={() => logoutClick()}>
                <a>Log Out</a>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <a>
              <Link className="bi bi-person-circle login" to="/Login">
                <a>Login</a>
              </Link>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

const NavList = ({ handleItemClick }) => {
  return (
    <ul>
      <li onClick={() => handleItemClick("/")}>
        <a>Home</a>
      </li>
      {/* <li onClick={() => handleItemClick("/Order")}>
        <a>Order</a>
      </li> */}
      <li onClick={() => handleItemClick("/contact")}>
        <a>Contact</a>
      </li>
      <li onClick={() => handleItemClick("/about")}>
        <a>About</a>
      </li>
    </ul>
  );
};

export default Navbar;
