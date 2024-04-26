import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./contextReducer";
import logo from "../assets/logo.png";

function Navbar() {
  const data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Toggle function for menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to open the cart
  const loadCart = () => {
    setCartView(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      {/* Navbar brand and logo */}
      <Link className="navbar-brand" to="https://foodnests.com/">
        <img style={{ height: "50px" }} src={logo} alt="logo" />
      </Link>

      {/* Toggle button for mobile view */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible menu */}
      <div
        className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/vendorRegistration">
              Vendor Registration
            </Link>
          </li>

          {localStorage.getItem("token") && (
            <li className="nav-item">
              <Link className="nav-link" to="/myOrder">
                My Orders
              </Link>
            </li>
          )}
        </ul>

        {/* Right side of the navbar */}
        <div className="d-flex">
          {!localStorage.getItem("token") ? (
            <div>
              <Link className="btn bg-white text-success mx-1" to="/register">
                Register
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-none text-secondary mx-1"
                onClick={loadCart}>
                My Cart
                <span className="badge text-bg-danger m-2">{data.length}</span>
              </div>

              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}

              <div
                className="btn bg-white text-danger mx-1"
                onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
