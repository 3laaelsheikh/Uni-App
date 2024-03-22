import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Uploaddetails from "../Uploaddetails/Uploaddetails";
import { Helmet } from "react-helmet";

const Uploaded = () => {
  const [showUpload, setShowUpload] = useState(false);

  const { state } = useLocation();

  if (showUpload) {
    return <Uploaddetails data={state} />;
  }

  return (
    <>
      <Helmet>
        <title>Uploud</title>
      </Helmet>
      <div className="my-5 py-5">
        <div className="text-decoration-none d-flex justify-content-center align-items-center">
          <div
            className="shadow bg-white rounded-3 p-3 "
            onClick={() => setShowUpload(true)}
          >
            <div className="text-center w-100">
              <i
                className="fa-solid fa-plus fs-1 text-muted bg-body-secondary text-center pt-2 text-dark my-5 rounded-5"
                style={{ width: "60px", height: "60px" }}
              ></i>
              <p className="text-muted">
                Files must be Video, PDF, DOC, XLS or PPT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Uploaded;
