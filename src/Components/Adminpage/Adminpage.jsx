import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authcontext } from "../Context/authentication";
import { Helmet } from "react-helmet";

const Adminpage = () => {
  const [allMessage, setAllMessage] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const { role, setRole } = useContext(authcontext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryGroups, setSearchQueryGroups] = useState("");

  // Ensure allUsers is initialized and not empty before filtering
  const filteredUsers = allUsers
    ? allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredGroups = allGroups
    ? allGroups.filter((groups) =>
        groups.subject_name
          .toLowerCase()
          .includes(searchQueryGroups.toLowerCase())
      )
    : [];

  const usermonth = {
    package_type: "month",
  };

  const usersemester = {
    package_type: "semester",
  };

  const usertolead = {
    role: "leader",
  };

  const leadtouser = {
    role: "user",
  };

  async function getAllRequests() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/leaders",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );
      console.log(allMessage);
      setAllMessage(data.groups);
    } catch (err) {
      console.log("error", err);
    }
  }

  async function getAllGroups() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/admin/all",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setAllGroups(data.groups);
    } catch (err) {
      console.log("error", err);
    }
  }

  async function deleteGroup(_id) {
    try {
      const { data } = await axios.delete(
        `https://sinai-college-project.onrender.com/api/v1/group/${_id}`,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      getAllGroups();

      if (data.message === "group deleted") {
        toast.success("Group Removed Successfully");
      } else {
        toast.error("Error Happend..");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function acceptRequest(_id) {
    try {
      const { data } = await axios.put(
        `https://sinai-college-project.onrender.com/api/v1/leader/group/${_id}`,
        {
          status: "accepted",
        },
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      getAllRequests();

      if (data.message === "group accepted") {
        toast.success(data.message);
      } else {
        toast.error("Error Happend..");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function rejectRequest(_id) {
    try {
      const { data } = await axios.put(
        `https://sinai-college-project.onrender.com/api/v1/leader/group/${_id}`,
        {
          status: "rejected",
        },
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      getAllRequests();

      if (data.message === "group rejected") {
        toast.success(data.message);
      } else {
        toast.error("Error Happend..");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }


  async function getAllUsers() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/admin/users",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setAllUsers(data);
    } catch (err) {
      console.log("error", err);
    }
  }

  async function deleteUser(_id) {
    try {
      const { data } = await axios.delete(
        `https://sinai-college-project.onrender.com/api/v1/admin/delete/${_id}`,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      getAllUsers();

      if (data.message === "user deleted") {
        toast.success("Account Removed Successfully");
      } else {
        toast.error("Error Happend..");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function updateUserPackage(_id, value) {
    try {
      const { data } = await axios.put(
        `https://sinai-college-project.onrender.com/api/v1/admin/update-package-type/${_id}`,
        value,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
      getAllUsers();

      if (data.message === "success") {
        toast.success("Package changed successfuly");
      } else {
        toast.error("error happend");
      }

      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function updateUserRole(_id, value) {
    try {
      const { data } = await axios.put(
        `https://sinai-college-project.onrender.com/api/v1/admin/update-role/${_id}`,
        value,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
      getAllUsers();

      if (data.message === "success") {
        toast.success("Update successfuly");
      } else {
        toast.error("error happend");
      }

      return data;
    } catch (error) {
      console.log("error", error);
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
      "#121534",
      "violet",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Randomly generated background color
  const backgroundColor = getRandomColor();

  useEffect(function () {
    getAllRequests();
    getAllGroups();
    getAllUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Page</title>
      </Helmet>

      {role === "admin" && (
        <section>
          <h3 className="text-center fw-bold mt-5">Users</h3>
          <div className="container mt-5 mb-2">
            <input
              className="form-control w-25 mx-5 rounded-5"
              type="text"
              placeholder="Search by username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div
            className="bg-secondary-subtle container rounded-3 w-75 overflow-y-scroll"
            style={{ height: "542px" }}
          >
            <div className="container">
              <div className="row gy-3 py-3">
                {filteredUsers ? (
                  <>
                    {filteredUsers.map(function (ele, index) {
                      return (
                        <>
                          <div key={index} className="col-lg-4 col-md-6">
                            <div className="shadow bg-white rounded-3 p-3 overflow-x-hidden ">
                              <div className="">
                                <h6 className="fw-bold">
                                  Username:
                                  <span className="text-muted">{ele.name}</span>
                                </h6>
                                <h6 className="fw-bold">
                                  Email:
                                  <span className="text-muted">
                                    {ele.email}
                                  </span>
                                </h6>
                                <h6 className="fw-bold">
                                  Role:
                                  <span className="text-muted">{ele.role}</span>
                                </h6>
                                <h6 className="fw-bold">
                                  Password:
                                  <span className="text-muted">
                                    {ele.password}
                                  </span>
                                </h6>
                                <h6 className="fw-bold">
                                  Phone:
                                  <span className="text-muted">
                                    {ele.phoneNumber}
                                  </span>
                                </h6>
                                <h6 className="fw-bold">
                                  Expiration Date:
                                  <span className="text-muted">
                                    {ele.expirationDate
                                      .split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </h6>
                              </div>
                              <div className="">
                                <div className="">
                                  <button
                                    className="btn text-white rounded-3 my-2 w-100"
                                    onClick={() =>
                                      updateUserPackage(ele._id, usermonth)
                                    }
                                    style={{
                                      backgroundColor: "rgba(82, 95, 224, 1)",
                                    }}
                                  >
                                    Extend 1 Month
                                  </button>
                                  <button
                                    className="btn text-white rounded-3 my-2 w-100"
                                    onClick={() =>
                                      updateUserPackage(ele._id, usersemester)
                                    }
                                    style={{
                                      backgroundColor: "rgba(82, 95, 224, 1)",
                                    }}
                                  >
                                    Extend 1 Semester
                                  </button>
                                  <div className="">
                                    {ele.role === "leader" && (
                                      <button
                                        className="btn text-white rounded-3 my-1 w-100"
                                        onClick={() =>
                                          updateUserRole(ele._id, leadtouser)
                                        }
                                        style={{
                                          backgroundColor:
                                            "rgba(82, 95, 224, 1)",
                                        }}
                                      >
                                        Update to user
                                      </button>
                                    )}
                                    {ele.role === "user" && (
                                      <button
                                        className="btn text-white rounded-3 my-1 w-100"
                                        onClick={() =>
                                          updateUserRole(ele._id, usertolead)
                                        }
                                        style={{
                                          backgroundColor:
                                            "rgba(82, 95, 224, 1)",
                                        }}
                                      >
                                        Update to leader
                                      </button>
                                    )}
                                  </div>
                                  <button
                                    className="btn btn-danger text-white rounded-3 my-2 w-100"
                                    onClick={() => deleteUser(ele._id)}
                                  >
                                    Delete User
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="text-center my-5 py-5 ">
                      <div className="my-5 py-5">
                        <h2 className="">there's no users</h2>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <section>
        <h3 className="text-center fw-bold mt-5">Requests</h3>
        <div
          className="bg-secondary-subtle container rounded-3 my-5 w-75 overflow-y-scroll shadow-sm "
          style={{ height: "396px" }}
        >
          <div className="container ">
            <div className="row gy-5 d-flex align-items-center justify-content-center">
              {allMessage ? (
                <>
                  {allMessage.map((request, idx) => {
                    return (
                      <>
                        {" "}
                        <div key={idx} className="col-lg-9">
                          <div className="shadow bg-white rounded-3 container mt-3 py-3 ">
                            <h5 className="fw-bold">
                              <span className="text-primary">
                                {request.requested_by}
                              </span>{" "}
                              wants to add{" "}
                              <span className="text-danger">
                                {request.subject_name}
                              </span>
                            </h5>
                            <h6 className="text-muted">
                              {request.description}
                            </h6>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <button
                            className="btn text-white rounded-5 m-3"
                            onClick={() => acceptRequest(request._id)}
                            style={{
                              width: "48px",
                              height: "48px",
                              backgroundColor: "rgba(72, 191, 30, 1)",
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button
                            className="btn text-white rounded-5 my-3"
                            onClick={() => rejectRequest(request._id)}
                            style={{
                              width: "48px",
                              height: "48px",
                              backgroundColor: "rgba(191, 30, 30, 1)",
                            }}
                          >
                            <i className="fa-solid fa-x"></i>
                          </button>
                        </div>{" "}
                      </>
                    );
                  })}{" "}
                </>
              ) : (
                <>
                  {allMessage == [] && (
                    <div className="text-center my-5 py-5 ">
                      <div className="my-5 py-5">
                        <h2 className="">there's no groups</h2>
                      </div>
                    </div>
                  )}

                  {/* <div className='text-center my-5 py-5 '>
                                <div className="my-5 py-5">
                                    <h2 className=''>there's no groups</h2>
                                </div>
                            </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-center fw-bold mt-5">Groups</h3>
        <div className="container mt-5 mb-2">
          <input
            className="form-control w-25 mx-5 rounded-5"
            type="text"
            placeholder="Search by Group-Name"
            value={searchQueryGroups}
            onChange={(e) => setSearchQueryGroups(e.target.value)}
          />
        </div>
        <div
          className="bg-secondary-subtle container rounded-3 w-75 overflow-y-scroll"
          style={{ height: "618px" }}
        >
          <div className="container">
            <div className="row gy-3 py-3">
              {filteredGroups ? (
                <>
                  {filteredGroups.map(function (ele, idnx) {
                    const backgroundColor = getRandomColor(); // Generate a random color for each element

                    return (
                      <>
                        <div key={idnx} className="col-lg-4 col-md-6">
                          <div className="shadow bg-white rounded-3 p-3 overflow-x-hidden">
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
                                  {ele.subject_name
                                    .split(" ")
                                    .map((word) => word.charAt(0))
                                    .join("")}
                                </h2>
                              </div>
                              <div className="mx-3">
                                <h5 className="fw-bold">{ele.subject_name}</h5>
                                <p className="text-muted">
                                  {ele.subject_group}
                                </p>
                              </div>
                            </div>
                            <p className="text-muted">{ele.description}</p>
                            <div className="">
                              <div className="d-flex justify-content-end">
                                {/* <button
                                  className="btn text-white rounded-3"
                                  onClick={() => joinGroup(ele._id)}
                                  style={{
                                    backgroundColor: "rgba(82, 95, 224, 1)",
                                  }}
                                >
                                  Join Group
                                </button> */}
                                <button
                                  className="btn btn-light rounded-5 "
                                  onClick={() => deleteGroup(ele._id)}
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  <i className="fa-regular fa-trash-can text-danger"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="text-center my-5 py-5 ">
                    <div className="my-5 py-5">
                      <h2 className="">there's no groups</h2>
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

export default Adminpage;
