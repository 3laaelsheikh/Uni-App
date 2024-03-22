import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FallingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [rePassword, setRePassword] = useState("");

  let user = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  let x = {
    rePassword: rePassword,
  };

  const [errMsg, setErrMsg] = useState(null);
  const [sucssesMsg, setSucssesMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function registerNewUser(values) {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `https://sinai-college-project.onrender.com/api/v1/users/`,
        values
      );
      console.log(data);

      if (data.success === "User created") {
        setSucssesMsg("Account has Created Successflly");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log("error", err);
      setErrMsg(err.response.data.ErrorMessage);
    }

    setIsLoading(false);
  }

  const formikObj = useFormik({
    initialValues: user,

    onSubmit: registerNewUser,

    validate: function (values) {
      setErrMsg(null);

      const errors = {};

      if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "Name must be form 3 characters to 20 characters ";
      }

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

      if (x.rePassword !== values.password) {
        errors.rePassword = "password and rePassword doesn't match";
      }

      if (values.phoneNumber.length == 10) {
        errors.phoneNumber = "Enter valid Phone Number";
      }

      return errors;
    },
  });

  function handelSelected(event) {
    const selectedValueMajor = event.target.value;
    setRePassword(selectedValueMajor);
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
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
            <h3>Register</h3>
            <p>
              If you already have an account
              <p>
                register you can{" "}
                <Link
                  className="text-primary text-decoration-none"
                  to={"/login"}
                >
                  Login here !
                </Link>
              </p>
            </p>

            <form onSubmit={formikObj.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.name}
                  type="text"
                  className="form-control mb-3"
                  id="name"
                  placeholder="Enter your name.."
                />
                <label htmlFor="name">UserName</label>
                {formikObj.errors.name && formikObj.touched.name ? (
                  <div className="alert alert-danger">
                    {formikObj.errors.name}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>

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

              <div className="form-floating mb-3">
                <input
                  onChange={handelSelected}
                  value={x.rePassword}
                  type="Password"
                  className="form-control mb-3"
                  id="rePassword"
                  placeholder="Confirm password.."
                />
                <label htmlFor="rePassword">Confirm password</label>
                {formikObj.errors.rePassword && formikObj.touched.rePassword ? (
                  <div className="alert alert-danger">
                    {formikObj.errors.rePassword}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.phoneNumber}
                  type="tel"
                  className="form-control mb-3"
                  id="phoneNumber"
                  placeholder="Enter your phone.."
                />
                <label htmlFor="phoneNumber">phoneNumber</label>
                {formikObj.errors.phoneNumber &&
                formikObj.touched.phoneNumber ? (
                  <div className="alert alert-danger">
                    {formikObj.errors.phoneNumber}{" "}
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
              >
                {isLoading ? (
                  <FallingLines
                    color="#fff"
                    width="60"
                    visible={true}
                    ariaLabel="falling-lines-loading"
                  />
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>

          <div className="col-lg-6">
            <div className="text-center">
              <img
                src={require("../../Image/Screenshot 4.png")}
                className="w-100"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
