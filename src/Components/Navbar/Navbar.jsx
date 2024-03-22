import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../Context/authentication";
import axios from "axios";

const Navbar = () => {
  const { token, setToken } = useContext(authcontext);
  const { role, setRole } = useContext(authcontext);

  const navRef = useRef();

  const navFunc = useNavigate();

  function logoutAdmin() {
    localStorage.removeItem("tkn");
    setToken(null);

    navFunc("/login");
  }
  async function logout() {
    try {
      const { data } = await axios.delete(
        "https://sinai-college-project.onrender.com/api/v1/users/logout",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
      setToken(null);
      localStorage.removeItem("tkn");
      navFunc("/login");
    } catch (err) {
      console.log("error", err);
    }
  }

  let arr = [
    { title: "Groups", to: "groups" },
    { title: "Contact", to: "contact" },
  ];

  const toggleNav = (e) => {
    navRef.current
      .querySelectorAll("li")
      .forEach((f) => f.classList.remove("active"));
    e.target.closest("li").classList.add("active");
  };

  function handleClick() {
    // Example condition

    // Check the condition
    if (role === "admin") {
      // Perform an action if condition is true
      logoutAdmin();
    } else {
      // Perform an action if condition is false
      logout();
    }
  }

  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid container">
            <Link to={"groups"}>
              <img
                src={require("../../Image/dd.png")}
                style={{ width: "50px" }}
                alt="icon of website"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav d-flex nav mb-2 mb-lg-0 ms-auto"
                ref={navRef}
              >
                {token ? (
                  <>
                    <div className="" ref={navRef}>
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <li className="nav-item" onClick={toggleNav}>
                            <Link className="nav-link" to={"groups"}>
                              Groups
                            </Link>
                          </li>
                        </div>

                        <div className="col-lg-6 col-md-12">
                          <li className="nav-item" onClick={toggleNav}>
                            <Link className="nav-link" to={"contact"}>
                              Contact
                            </Link>
                          </li>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* <Link className="nav-link" to={"home"}>
                      Home
                    </Link> */}
                  </>
                )}
              </ul>

              <ul className="navbar-nav ms-auto px-2 ">
                {token ? (
                  <>
                    <li className="nav-item px-1">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="profile"
                      >
                        <i className="fa-regular fa-user"></i>
                      </Link>
                    </li>
                    <li className="nav-item px-1">
                      <span
                        onClick={handleClick}
                        className="nav-link"
                        aria-current="page"
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <Link className="navlink" aria-current="page" to="register">
                      <button
                        className="btn text-white m-1 px-3"
                        style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
                      >
                        Register
                      </button>
                    </Link>
                    <Link className="navlink" aria-current="page" to="login">
                      <button className="btn btn-outline-light text-black border-primary m-1 px-3">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
