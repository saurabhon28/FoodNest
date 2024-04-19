import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./contextReducer";

function Navbar() {
  let data = useCart();
  const navigate = useNavigate();
  // cart portal view logic
  const [cartView, setCartView] = useState(false);
  //logout handling
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="https://foodnests.com/">
          <img style={{ height: "50px" }} src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/vendorRegistration">
                Vendor Registration
              </Link>
            </li>
            {localStorage.getItem("token") ? (
              <Link className="nav-link active fs-5" to="/">
                My Orders
              </Link>
            ) : (
              ""
            )}
          </ul>
          <div className="d-flex">
            {!localStorage.getItem("token") ? (
              <div>
                {" "}
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
                  className="btn bg-white text-success mx-1"
                  onClick={() => {
                    setCartView(true);
                  }}>
                  My Cart
                  <span className="badge text-bg-danger m-2">
                    {data.length}
                  </span>
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
    </div>
  );
}

export default Navbar;
