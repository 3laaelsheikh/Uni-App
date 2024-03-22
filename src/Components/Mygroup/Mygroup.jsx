import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mygroupsContext } from "../Context/Mygroups";
import imag2 from "../../Image/Vector1.svg";
import imag3 from "../../Image/Vector2.svg";
import toast from "react-hot-toast";
import { adminContext } from "../Context/Admin";
import img1 from "../../Image/Shield.svg";
import { Helmet } from "react-helmet";

const Mygroup = () => {
  const [myGroups, setMyGroups] = useState(null);
  const [allRequestPending, setAllRequestPending] = useState(null);
  const { role, setRole } = useContext(adminContext);

  const {
    subjectName,
    subjectGroup,
    description,
    majore,
    year,
    startedGroups,
    setStartedGroups,
    numberOfLiked,
  } = useContext(mygroupsContext);
  const [number, setNumber] = useState(null);

  const starvalue = {
    subject_name: { subjectName },
    subject_group: { subjectGroup },
    description: { description },
    majore: { majore },
  };

  async function getMyGroups() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/user/groups",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setMyGroups(data.groups);
      setNumber(data.number_of_liked_groups);
    } catch (err) {
      console.log("error", err);
      if (err.response.data.ErrorMessage === "Package expired") {
        // toast.error("Package expired go to Pay the subscription with Mr: Abdallah phone:+201062949856")
        toast.error(
          "Package expired go to Pay the subscription with Mr:Abdallah phone: +201062949856"
        );
      }
    }
  }

  async function updateStarPackage(_id, value) {
    try {
      const { data } = await axios.post(
        `https://sinai-college-project.onrender.com/api/v1/users/groups/${_id}/starGroup`,
        value,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setStartedGroups(data.user);

      getMyGroups();

      if (data.message === "success") {
        toast.success("proccess is done");
      } else {
        toast.error("error happend");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function leaveGroup(_id) {
    try {
      const { data } = await axios.put(
        `https://sinai-college-project.onrender.com/api/v1/leave/${_id}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      if (data.message === "Successfully left the group") {
        toast.success(data.message);
      }
      if (data.ErrorMessage == "Group not found") {
        toast.error(data.ErrorMessage);
      }

      getMyGroups();

      return data;
    } catch (error) {
      console.log("error", error);
      if (
        error.response.data.ErrorMessage ==
        "You are already a member of this group"
      ) {
        toast.error(error.response.data.ErrorMessage);
      }
    }
  }

  async function getAllRequestPending() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/pending",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setAllRequestPending(data.groups);
    } catch (err) {
      console.log("error", err);
    }
  }

  const getRandomColor = () => {
    const colors = [
      "#323A8A",
      "blue",
      "blueviolet",
      "yellowgreen",
      "orange",
      "#979FEC",
      "#525FE0",
      "#22275F",
      "#1A1E4A",
      "violet",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Randomly generated background color
  const backgroundColor = getRandomColor();

  useEffect(function () {
    getMyGroups();
    getAllRequestPending(allRequestPending);
  }, []);

  return (
    <>
      <Helmet>
        <title>My groups</title>
      </Helmet>

      {/* start nav */}
      <section className="">
        {role === "leader" && (
          <div className="d-flex justify-content-center admin m-5">
            <Link
              className="navlink ms-auto"
              aria-current="page"
              to="/adminpage"
            >
              <button
                className="btn text-white m-1 px-3 position-relative"
                style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
              >
                Admin
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {allRequestPending}{" "}
                  <span className="visually-hidden">unread messages</span>
                </span>
                <img src={img1} className="px-1" alt="logo of sheild" />
              </button>
            </Link>
          </div>
        )}
        {role === "admin" && (
          <div className="d-flex justify-content-center admin m-5">
            <Link
              className="navlink ms-auto"
              aria-current="page"
              to="/adminpage"
            >
              <button
                className="btn text-white m-1 px-3 position-relative"
                style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
              >
                Admin
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {allRequestPending}{" "}
                  <span className="visually-hidden">unread messages</span>
                </span>
                <img src={img1} className="px-1" alt="logo of sheild" />
              </button>
            </Link>
          </div>
        )}
        {role === "user" && <div></div>}

        <div className="d-flex justify-content-center my-5">
          <ul className="nav nav1 nav-underline">
            <li className="nav-item nav-underline">
              <Link className="nav-link activ">My Groups</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-muted" to={"/groups"}>
                Join Group
              </Link>
            </li>
          </ul>
        </div>
      </section>
      {/* end nav */}

      <section>
        <div
          className="bg-secondary-subtle container rounded-3 my-5 w-75 overflow-y-scroll"
          style={{ height: "618px" }}
        >
          <div className="container">
            <div className="row gy-3 py-3">
              {myGroups ? (
                <>
                  {myGroups.map(function (elm, idx) {
                    const backgroundColor = getRandomColor(); // Generate a random color for each element
                    return (
                      <div key={idx} className="col-lg-4 col-md-6">
                        <div className="shadow bg-white rounded-3 p-3 overflow-x-hidden">
                          <ul className="navbar-nav mb-2 mb-lg-0 px-2">
                            <li className="nav-item dropdown d-flex justify-content-end">
                              <a
                                className="nav-link "
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fa-solid fa-ellipsis fs-5"></i>
                              </a>
                              <ul className="dropdown-menu">
                                <li className="d-flex justify-content-center">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => leaveGroup(elm._id)}
                                  >
                                    Leave Group
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <Link
                            className="text-decoration-none text-black"
                            to={"/videos"}
                            state={elm}
                          >
                            <div className="d-flex align-baseline">
                              <div
                                className="rounded-5 d-flex align-items-center justify-content-center "
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  backgroundColor: backgroundColor,
                                }}
                              >
                                <h2 className="text-white pt-2">
                                  {elm.subject_name
                                    .split(" ")
                                    .map((word) => word.charAt(0))
                                    .join("")}
                                </h2>
                              </div>
                              <div className="mx-3">
                                <h5 className="fw-bold">{elm.subject_group}</h5>
                                <p className="text-muted">{elm.subject_name}</p>
                              </div>
                            </div>
                            <p className="text-muted">{elm.description}</p>
                          </Link>
                          <div className="d-flex justify-content-end">
                            <div className="">
                              {number > idx ? (
                                <button
                                  className="btn me-auto bg-body-secondary rounded-5"
                                  onClick={() => updateStarPackage(elm._id)}
                                >
                                  <img
                                    src={imag3}
                                    className="py-1"
                                    alt="vector solid"
                                  />
                                </button>
                              ) : (
                                <button
                                  className="btn me-auto bg-body-secondary rounded-5"
                                  onClick={() =>
                                    updateStarPackage(elm._id, starvalue)
                                  }
                                >
                                  <img
                                    src={imag2}
                                    className="py-1"
                                    alt="vector "
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-lg-4 col-md-6">
                    <Link className="text-decoration-none" to={"/groups"}>
                      <div className="shadow bg-white rounded-3 p-3 ">
                        <div className="d-flex justify-content-center align-items-center">
                          <i
                            className="fa-solid fa-plus fs-1 bg-body-secondary text-center pt-2 text-dark my-5 rounded-5"
                            style={{ width: "60px", height: "60px" }}
                          ></i>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="  ">
                    <div className="col-lg-4 col-md-6">
                      <Link className="text-decoration-none" to={"/groups"}>
                        <div className="shadow bg-white rounded-3 p-3 ">
                          <div className="d-flex justify-content-center align-items-center">
                            <i
                              className="fa-solid fa-plus fs-1 bg-body-secondary text-center pt-2 text-dark my-5 rounded-5"
                              style={{ width: "60px", height: "60px" }}
                            ></i>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mygroup;
