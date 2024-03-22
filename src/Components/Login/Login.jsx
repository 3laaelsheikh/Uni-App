import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../Context/authentication";
import img10 from "../../Image/Screenshot 4.png";
import { Helmet } from "react-helmet";

const Login = () => {
  const { setToken } = useContext(authcontext);

  const [errMsg, setErrMsg] = useState(null);
  const [sucssesMsg, setSucssesMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [randomId, setRandomId] = useState(generateRandomId(300));

  let x = randomId;
  let user = {
    email: "",
    password: "",
    device_id: x,
  };
  const navigate = useNavigate();

  function generateRandomId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // setRandomId(result);
    // console.log(randomId);
    return result;
  }

  async function registerNewUser(values) {
    setIsLoading(true);
    console.log("sending to backend");

    generateRandomId(300);

    try {
      const { data } = await axios.post(
        "https://sinai-college-project.onrender.com/api/v1/users/login",
        values
      );
      console.log(data);

      if (data.message === "Logged in") {
        localStorage.setItem("tkn", data.token);
        setToken(data.token);
        setSucssesMsg("Welcome back");
        setTimeout(() => {
          navigate("/mygroup");
        }, 2000);
      }
    } catch (err) {
      console.log("error", err);
      setErrMsg("email or password is invalid");
    }

    setIsLoading(false);
  }

  async function userIsLogged(values) {
    console.log("check for api");

    try {
      const { data } = await axios.post(
        "https://sinai-college-project.onrender.com/api/v1/users/checkLogin",
        values
      );
      console.log(data);
      if (data.is_logged) {
        // window.alert(
        //   <div className="">
        //     <p>this user is logged in another device <span className="text-danger">Are you want to continue here!</span></p>
        //     <div className="d-flex justify-content-between">
        //       <button className="btn btn-success">yes</button>
        //       <button className="btn btn-danger">no</button>
        //     </div>
        //   </div>
        // )
        const confirmation = window.confirm(
          "This user is logged in another device. Are you sure you want to continue here?"
        );

        if (confirmation) {
          // User clicked "Yes"
          registerNewUser(values);
        } else {
          // User clicked "No" or pressed cancel
          // Perform the desired action
        }
      }
      if (!data.is_logged) {
        registerNewUser(values);
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  const formikObj = useFormik({
    initialValues: user,

    onSubmit: userIsLogged,

    validate: function (values) {
      setErrMsg(null);

      const errors = {};

      if (
        !values.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        errors.email = "Email not valid example: exemple@yyy.zzz ";
      }

      if (values.password.length < 6) {
        errors.password = "Enter valid password include Minimum six characters";
      }

      return errors;
    },
  });

  useEffect(() => {
    generateRandomId(300);
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className=" py-5 container">
        {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}

        {sucssesMsg ? (
          <div className="alert alert-success">{sucssesMsg}</div>
        ) : (
          ""
        )}

        <div className="row gy-5">
          <div className="col-lg-6">
            <h3>Login</h3>
            <p>
              If you don’t have an account
              <p>
                register you can{" "}
                <Link
                  className="text-primary text-decoration-none"
                  to={"/register"}
                >
                  Register here !
                </Link>
              </p>
            </p>

            <form onSubmit={formikObj.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.email}
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  placeholder="Enter your e-mail.."
                />
                <label htmlFor="email">Email address</label>
                {formikObj.errors.email && formikObj.touched.email ? (
                  <div className="alert alert-danger">
                    {formikObj.errors.email}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  type="password"
                  className="form-control mb-3"
                  id="password"
                  placeholder="Enter your password.."
                />
                <label htmlFor="password">password</label>
                {formikObj.errors.password && formikObj.touched.password ? (
                  <div className="alert alert-danger">
                    {formikObj.errors.password}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                disabled={
                  formikObj.isValid === false || formikObj.dirty == false
                }
                className="bn632-hover bn21 w-100 rounded-5"
                onClick={() => userIsLogged(formikObj.values.email)} // Call isLogged function before login
              >
                {isLoading ? (
                  <FallingLines
                    color="#fff"
                    width="40"
                    visible={true}
                    ariaLabel="falling-lines-loading"
                  />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>

          <div className="col-lg-6">
            <div className="text-center">
              <img src={img10} className="w-100" alt="login image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
