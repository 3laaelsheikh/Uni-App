import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../Context/authentication";
import img1 from "../../Image/Shield.svg";
import { event } from "jquery";
import { adminContext } from "../Context/Admin";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Groups = () => {
  const [allRequestPending, setAllRequestPending] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const { role, setRole } = useContext(adminContext);
  const [value, setValue] = useState("");
  const [valueYear, setValueYear] = useState("");
  const [valueofmajore, setValueOfMajore] = useState("");

  const [selectedValueYear, setSelectedValueYear] = useState(""); // State variable for selected year
  const [selectedSubject, setSelectedSubject] = useState(""); // State variable for selected subject
  const [filterdGroup, setFilterdGroup] = useState([]);

  const navigate = useNavigate();

  const x = value;
  const y = valueYear;
  let majortoyears = {
    majore: x,
  };

  let yearSubject = {
    majore: x,
    year: y,
  };

  async function getAllRequestPending() {
    try {
      const { data } = await axios.get(
        "https://sinai-college-project.onrender.com/api/v1/pending",
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      setAllRequestPending(data.groups);
    } catch (err) {
      console.log("error", err);
      if (err.response.data.ErrorMessage === "Package expired") {
        toast.error(
          "Package expired go to Pay the subscription with Mr:Abdallah phone: +201062949856"
        );
      }
    }
  }

  async function getYearsByMajore(selectedValue) {
    const token = localStorage.getItem("tkn");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      majore: selectedValue, // Use the selected value here
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://sinai-college-project.onrender.com/api/v1/filter/major",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const parsedResponse = JSON.parse(result);
        console.log(parsedResponse);

        if (parsedResponse.ErrorMessage === "Package expired") {
          toast.error(
            "Package expired go to Pay the subscription with Mr:Abdallah phone: +201062949856"
          );
        }

        var gradesNum = parsedResponse.grades;
        console.log(gradesNum);

        // Select the <select> element
        const selectElement = document.querySelector(".Zobri");

        // Clear any existing options
        selectElement.innerHTML = "<option selected disabled>Years</option>";
        // Populate options based on gradesNum
        for (let i = 1; i <= gradesNum; i++) {
          const option = document.createElement("option");
          option.value = i + (i !== 1 ? "" : "");
          option.textContent = i + (i !== 1 ? "" : ""); // Pluralize 'Year' if needed
          selectElement.appendChild(option);
        }
      })
      .catch((error) => console.error(error));
  }

  async function getSubjectByYearsAndMajore(value, selectedValueYear) {
    const token = localStorage.getItem("tkn");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      majore: value, // Use the selected value here
      year: selectedValueYear,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://sinai-college-project.onrender.com/api/v1/filter/year",
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      // Update the state variable with the subjects from the response
      setSubjects(result.subjects);
      console.log(subjects);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFilterdGroup(value, selectedValueYear, selectedSubject) {
    const token = localStorage.getItem("tkn");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      majore: value, // Use the selected value here
      year: selectedValueYear,
      subject_name: selectedSubject,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://sinai-college-project.onrender.com/api/v1/filter",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      const parsedResponse = result;
      console.log(parsedResponse);
      const Groups = parsedResponse.groups;
      console.log(Groups);
      navigate("/allgroup", { state: Groups });
    } catch (error) {
      console.error(error);
    }
  }

  function handelSelected(event) {
    const selectedValueMajor = event.target.value;
    setValue(selectedValueMajor);
    console.log(selectedValueMajor);
  }
  function handleSelectedYear(event) {
    const selectedValueYear = event.target.value;
    setValueYear(selectedValueYear);
    console.log(selectedValueYear); // Log the selected value
    console.log(valueYear);
  }
  const handleSubjectSelect = (event) => {
    const selectedSubject = event.target.value;
    console.log(selectedSubject);
    setSelectedSubject(event.target.value); // Update the selected subject state
  };

  useEffect(function () {
    getAllRequestPending(allRequestPending);
  }, []);

  return (
    <>
      <Helmet>
        <title>Uni</title>
      </Helmet>
      {/* start nav */}
      <section className="">
        {role === "leader" && (
          <div className="d-flex justify-content-center admin m-5">
            <Link
              className="navlink ms-auto"
              aria-current="page"
              to="/adminpage"
            >
              <button
                className="btn text-white m-1 px-3 position-relative"
                style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
              >
                Admin
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {allRequestPending}{" "}
                  <span className="visually-hidden">unread messages</span>
                </span>
                <img src={img1} className="px-1" alt="logo of sheild" />
              </button>
            </Link>
          </div>
        )}
        {role === "admin" && (
          <div className="d-flex justify-content-center admin m-5">
            <Link
              className="navlink ms-auto"
              aria-current="page"
              to="/adminpage"
            >
              <button
                className="btn text-white m-1 px-3 position-relative"
                style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
              >
                Admin
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {allRequestPending}{" "}
                  <span className="visually-hidden">unread messages</span>
                </span>
                <img src={img1} className="px-1" alt="logo of sheild" />
              </button>
            </Link>
          </div>
        )}
        {role === "user" && <div></div>}

        <div className="d-flex justify-content-center my-5">
          <ul className="nav nav-underline mx-5">
            <li className="nav-item">
              <Link className="nav-link text-muted" to={"/mygroup"}>
                My Groups
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to={"/allgroup"}>
                Join Group
              </Link>
            </li>
          </ul>
        </div>
      </section>
      {/* end nav */}

      <section section className="groups1">
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="w-50">
            <div className="my-2">
              <select
                className="form-select"
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  handelSelected(event);
                  getYearsByMajore(selectedValue);
                }}
                aria-label="Default select example"
              >
                <option selected disabled>
                  Groups
                </option>
                <option value="computer science">computer science</option>
                <option value="dentist">dentist</option>
                <option value="pharmacy">pharmacy</option>
                <option value="physical therapy">physical therapy</option>
                <option value="engineering">engineering</option>
                <option value="business">business</option>
                <option value="media">media</option>
              </select>
            </div>
            <div className="my-2">
              <select
                className="form-select Zobri"
                onChange={(event) => {
                  const selectedValueYear = event.target.value;
                  handleSelectedYear(event);
                  getSubjectByYearsAndMajore(value, selectedValueYear);
                  console.log(selectedValueYear);
                }}
                aria-label="Default select example"
              >
                <option selected disabled>
                  Years
                </option>
              </select>
            </div>

            <div className="my-2">
              <select
                className="form-select Wks7a"
                aria-label="Default select example"
                onChange={(event) => {
                  const selectedSubject = event.target.value;
                  handleSubjectSelect(event);
                  console.log(selectedSubject);
                  setSelectedSubject(selectedSubject);
                }}
              >
                <option selected disabled>
                  Subjects
                </option>
                {/* Map over the subjects state variable to populate options */}
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <div className="w-50 my-5">
            <button
              className="btn w-100 text-white"
              onClick={() => getFilterdGroup(value, valueYear, selectedSubject)}
              style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
            >
              Show Groups
            </button>
            <h5 className="text-center fw-bold text-primary my-3">Or</h5>
            <Link
              className="text-decoration-none text-black"
              to={"/creategroup"}
            >
              <button className="btn btn-outline-light text-black border-primary w-100">
                Create Group
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Groups;
