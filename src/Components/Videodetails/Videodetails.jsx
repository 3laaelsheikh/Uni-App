import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { mygroupsContext } from "../Context/Mygroups";
import { type } from "@testing-library/user-event/dist/type";

const Videodetails = () => {
  const [allvideos, setAllvideos] = useState(null);
  const {
    subjectName,
    subjectGroup,
    description,
    majore,
    year,
    startedGroups,
    setStartedGroups,
  } = useContext(mygroupsContext);

  const { elm } = useParams();
  console.log(elm);

  const videoRef = useRef();

  const { state } = useLocation();

  async function createUrlFromStream(readableStream) {
    const response = new Response(readableStream);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  function getAllVideos() {
    const token = localStorage.getItem("tkn");
    const url = `https://sinai-college-project.onrender.com/api/v1/download/${elm}`;
    const dataOfGroup = {
      majore: state.data.majore,
      subject_name: state.data.subject_name,
      year: state.data.year,
      subject_group: state.data.subject_group,
      file_type: state.type,

      
    };

    fetch(url, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataOfGroup),
    })
      .then((response) => response)
      .then(async (data) => {
        console.log(elm);
        console.log(dataOfGroup);

        console.log("Success:", data);
        const stream = data.body;

        const videoUrl = await createUrlFromStream(stream);
        if (state.type == "file") {
          videoRef.current.href = videoUrl;
        } else {
          videoRef.current.src = videoUrl;
        }

        // Create a new ReadableStream

        console.log(data.body);

        // Save your data here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getAllVideos(allvideos);
  }, []);

  return (
    <>
      <div className="App">
        <div className="my-5">
          {state.type == "file" ? (
            <a ref={videoRef} download={elm}>
              <div className="d-flex align-items-center justify-content-center" style={{height:"509px"}}>
                <div>
                  <button className="btn">
                    <i className="fa-solid fa-file-arrow-down fa-5x"></i>
                  </button>
                  <h4 className="fw-bold ttext-center text-decoration-none text-black">
                    Click to download file
                  </h4>
                </div>
              </div>
            </a>
          ) : (
            <video ref={videoRef} width="800" height="600" controls autoPlay />
          )}
        </div>
      </div>
    </>
  );
};

export default Videodetails;
