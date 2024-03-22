import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { authcontext } from "../Context/authentication";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Profile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const { token, setToken } = useContext(authcontext);

  const navFunc = useNavigate();

  async function deleteSelf() {
    try {
      const { data } = await axios.delete(
        "https://sinai-college-project.onrender.com/api/v1/users/deleteUser",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      console.log(data);
      setToken(null);
      navFunc("/login");
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(() => {
    const res = jwtDecode(localStorage.getItem("tkn"));
    setName(res.name);
    setEmail(res.email);
    setRole(res.role);
    setExpirationDate(res.expirationDate);
  }, []);

  if (name === null) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div
        className=" container d-flex justify-content-center align-items-center  my-5"
        style={{ height: "418px" }}
      >
        <div className="container rounded-3 shadow w-50">
          <div className="text-center">
            <h5 className=" main-color pt-5 ">
              Welcome,
              <span style={{ color: "rgba(82, 95, 224, 1)" }}>{name}</span>
            </h5>
            <h5 className=" main-color pt-2 ">
              Email:
              <span className="text-muted">{email}</span>
            </h5>
            <h5 className=" main-color pt-2 ">
              Role: <span className="text-muted">{role}</span>
            </h5>
            <h5 className=" main-color pt-2 ">
              Expiration_Date:
              <span className="text-muted">
                {expirationDate.split("T").slice(0, 1).join("")}
              </span>
            </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button className="btn btn-danger mb-5 w-50" onClick={deleteSelf}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
