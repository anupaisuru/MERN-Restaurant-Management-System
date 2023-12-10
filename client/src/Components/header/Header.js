import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";
import BrandLogo from "../BrandLogo/BrandLogo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  function logout() {
    localStorage.removeItem("currentUser");
    localStorage.clear();
    window.location.href = "/login";
  }

  const location = useLocation();
  const [isMenuPage, setIsMenuPage] = useState(false);
  useEffect(() => {
      setIsMenuPage(location.pathname === "/menu");
  }, [location]);

  return (
      <div className="Header">
          <nav className="navbar navbar-expand-lg mclas">
              {/* <a className="navbar-brand a1 tlogo" href="/">
          MealMatch
        </a> */}
              <BrandLogo />
              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon">
                      <i className="fa-solid fa-bars"> </i>
                  </span>
              </button>
              <div
                  className="collapse navbar-collapse"
                  id="navbarNav"
                  style={{ flex: "revert" }}
              >
                  <ul className="navbar-nav ld">
                      {user ? (
                          <>
                              {isMenuPage && (
                                  <div className="cart-btn">
                                      <Link to="/cart">
                                          <button
                                              style={{
                                                  backgroundColor:
                                                      "transparent",
                                                  border: "none",
                                                  position: "relative",
                                                  top: "5px",
                                                  right: "25px",
                                              }}
                                          >
                                              <ShoppingCartIcon fontSize="small" />
                                          </button>
                                      </Link>
                                  </div>
                              )}

                              <div className="dropdown dropstart">
                                  <button
                                      className="btn btn-secondary dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                  >
                                      <i className="fa fa-user"></i>
                                      <AccountCircleIcon />
                                      {user.firstName}
                                  </button>
                                  <div
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton"
                                  >
                                      <a
                                          className="dropdown-item plists"
                                          href="/menu"
                                      >
                                          Home
                                      </a>
                                      <a
                                          className="dropdown-item plists"
                                          href="/profile"
                                      >
                                          Profile
                                      </a>
                                      {user.role === "admin" ? (
                                          <a
                                              className="dropdown-item plists"
                                              href="/dashboard"
                                          >
                                              Admin
                                          </a>
                                      ) : null}
                                      <a
                                          className="dropdown-item plists"
                                          href="/login"
                                          onClick={logout}
                                      >
                                          Logout
                                      </a>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <>
                              <li className="nav-item">
                                  <a className="nav-link a1" href="/register">
                                      Register
                                  </a>
                              </li>
                              <li className="nav-item">
                                  <a className="nav-link a1" href="/login">
                                      Login
                                  </a>
                              </li>
                          </>
                      )}
                  </ul>
              </div>
          </nav>
      </div>
  );
}

export default Header;
