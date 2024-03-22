import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";
import { mygroupsContext } from "../Context/Mygroups";
import VideoWrapper from "./Video_Wrapper";
import Uploaded from "../Uploaded/Uploaded";
import Files from './../Files/Files';

const Videos = () => {
  const [type, setType] = useState("videos");
  const [showComponent, setShowComponent] = useState();

  const { getMyGroups } = useContext(mygroupsContext);
  const { state } = useLocation();
  console.log(state);
  console.log(type);

  useEffect(() => {
    getMyGroups();
  }, []);

  const navArr = [
    {
      title: "Videos",
      type: "videos",
      component: <VideoWrapper type="video" data={state} key="video" />,
    },
    {
      title: "Files",
      type: "files",
      component: <Files type="file" data={state} key="files" />
      // component: <VideoWrapper type="file" data={state} key="files" />,
    },
    { title: "Upload", type: "upload", component: <Uploaded data={state} /> },
  ];

  useLayoutEffect(() => {
    if (!showComponent) setShowComponent(navArr[0].component);
  }, []);

  return (
    <>
      {/* start nav */}
      <section className="">
        <div className="d-flex nav1 justify-content-center my-5">
          <ul className="nav nav-underline">
            {navArr.map((e) => (
              <li
                className="nav-item" 
                onClick={() => setShowComponent(e.component)}
              >
                <p className="nav-link a">{e.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {showComponent}
      </section>
      {/* end nav */}
    </>
  );
};

export default Videos;
