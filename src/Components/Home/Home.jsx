import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <header className="">
        <div className="home container mt-4 d-flex justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center gy-5">
            <div className="col-lg-6">
              <div className="mx-5">
                <h1 className="fw-bold mb-4 homeh1">
                  Access to your lectures, files and data without internet
                </h1>
                <p className="fw-bold text-muted mt-4">
                  With Uni App you can add or search for groups that contains
                  media like lectures and subject materials
                </p>
                <div className="pt-3">
                  <Link className="nav-link" to="/login">
                    <button className="bn632-hover bn21">Try it now</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img
                  src={require("../../Image/Downloads2.jpg")}
                  className="w-75 rounded-3 shadow"
                  alt="pic"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="container my-5">
          <div className="d-flex justify-content-center align-items-center text-center">
            <div className=" pt-5 my-5">
              <h2 className="">App Feature</h2>
              <div className="line rounded-5 mx-5 text-center"></div>
            </div>
          </div>
          <div className="row gy-5">
            <div className="col-lg-4 col-md-6 col-sm-12 gy-5">
              <div className=" shadow rounded-3 text-center overflow-x-hidden">
                <img
                  src={require("../../Image/Screenshot 1.png")}
                  className="w-75"
                  alt=""
                />
                <h4 className="pt-3">Uni App</h4>
                <p className="p-3 text-muted">
                  Where all your lectures and materials in one place
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 gy-5">
              <div className=" shadow rounded-3 text-center overflow-x-hidden">
                <img
                  src={require("../../Image/Screenshot 2.png")}
                  className="w-75"
                  alt=""
                />
                <h4 className="pt-4">Private Groups</h4>
                <p className="p-3 text-muted">
                  Subject groups to share lectures, materials and chat with
                  other colleges
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 gy-5">
              <div className=" shadow rounded-3 text-center overflow-x-hidden">
                <img
                  src={require("../../Image/Screenshot 3.png")}
                  className="w-75"
                  alt=""
                />
                <h4 className="pt-5">App features</h4>
                <p className="p-3 text-muted">
                  Access the media without internet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
