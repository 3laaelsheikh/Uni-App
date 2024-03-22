import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useLocation, useParams } from "react-router-dom";
import { mygroupsContext } from "../Context/Mygroups";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Files = ({ type, data }) => {
  const [allFiles, setAllFiles] = useState(null);
  const { elm } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allFiles
    ? allFiles.filter((files) =>
        files.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const {
    subjectName,
    subjectGroup,
    description,
    majore,
    year,
    startedGroups,
    setStartedGroups,
    getMyGroups,
  } = useContext(mygroupsContext);
  const { state } = useLocation();
  console.log(state);

  

  function getAllFiles(majore, subjectName, year, subjectGroup) {
    const token = localStorage.getItem("tkn");
    const url = "https://sinai-college-project.onrender.com/api/v1/data";
    const dataOfGroup = {
      majore: data.majore,
      subject_name: data.subject_name,
      year: data.year,
      subject_group: data.subject_group,
      file_type: type,

      
    };

    fetch(url, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataOfGroup),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(dataOfGroup);
        setAllFiles(data.files);

        if (data.ErrorMessage === "Package expired") {
          toast.error(
            "Package expired go to Pay the subscription with Mr:Abdallah phone: +201062949856"
          );
        }

        // Save your data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteFile(elm) {
    const token = localStorage.getItem("tkn");
    const url = `https://sinai-college-project.onrender.com/api/v1/delete/${elm}`;
    const dataOfGroup = {
      majore: data.majore,
      subject_name: data.subject_name,
      year: data.year,
      subject_group: data.subject_group,
      file_type: type,
    };

    fetch(url, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataOfGroup),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(dataOfGroup);
        setAllFiles(data.files);
        getAllFiles();
        // Save your data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getAllFiles();
    getMyGroups();
  }, []);

  return (
    <>
      <Helmet>
        <title>Files</title>
      </Helmet>

      <div className="container mt-5 mb-2">
        <input
          className="form-control w-25 mx-5 rounded-5"
          type="text"
          placeholder="Search by file_name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div
        className="container my-2 w-75 rounded-3 bg-body-secondary overflow-y-scroll"
        style={{ height: "609px" }}
      >
        <div className="row">
          {filteredUsers ? (
            <>
              {filteredUsers.map(function (elm, idx) {
                return (
                  <div key={idx} className="col-lg-3 col-md-6">
                    <div className=" container bg-white my-4  rounded-3 shadow">
                      <Link
                        to={`/videodetails/${elm}`}
                        className="text-decoration-none text-black"
                        state={{ data, type }}
                      >
                        <div className="d-flex align-baseline">
                          <i
                            className="fa-regular fa-file fa-3x my-2"
                            style={{ color: "rgba(82, 95, 224, 1)" }}
                          ></i>

                          <div className="px-2 overflow-x-hidden">
                            <h5 className="pt-2">
                              {elm.replace(/[\d-]+/g, "")}
                              {/* {elm.split("-").slice(0, 1).join(" ")} */}
                            </h5>
                          </div>
                        </div>
                      </Link>
                      <div className="d-flex justify-content-end">
                        <div>
                          <button
                            className="btn me-auto bg-body-secondary mb-2 rounded-5"
                            onClick={() => deleteFile(elm)}
                          >
                            <i className="fa-regular fa-trash-can text-danger"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {" "}
              <div className="vh-100 d-flex justify-content-center align-items-center">
                <h3>there's no files</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
