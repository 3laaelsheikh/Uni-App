import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="py-5 ">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="row gy-3">
            <div className="col-lg-6 text-center">
              <img
                src={require("../../Image/dd.png")}
                style={{ width: "90px" }}
                alt=""
              />
            </div>
            <div className="col-lg-6 ">
              
                <h2 className="fw-bold text-center text-muted">UniApp</h2>
                <h6 className="text-muted text-center text-muted">2023-2024</h6>
                <h6 className="text-center text-muted">V1.0</h6>
              
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
