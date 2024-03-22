import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Creategroup = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [value, setValue] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [valueYear, setValueYear] = useState("");
  const [valueofmajore, setValueOfMajore] = useState("");
  const [valueOfGroupNumber, setValueOfGroupNumber] = useState("");
  const [valueOfDescription, setValueOfDescription] = useState("");

  const [selectedValueYear, setSelectedValueYear] = useState(""); // State variable for selected year
  const [selectedSubject, setSelectedSubject] = useState(""); // State variable for selected subject
  const [alll, setAlll] = useState();
  const [showInput, setShowInput] = useState(false);

  const navigate = useNavigate();

  let user = {
    subject_name: selectedSubject,
    subject_group: valueOfGroupNumber,
    year: valueYear,
    description: valueOfDescription,
    majore: value,
  };

  async function craeteGroupRequest(value, valueYear, selectedSubject) {
    try {
      const { data } = await axios.post(
        `https://sinai-college-project.onrender.com/api/v1/`,
        user,
        {
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );
      console.log(data);

      if (data.message === "create group requested") {
        toast.success("Group request created Successfully");
        setTimeout(() => {
          navigate("/mygroup");
        }, 2000);
      }
      if (data.ErrorMessage === "This groups exists") {
        toast.error(data.ErrorMessage);
      }
    } catch (err) {
      console.log("error", err);
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

        if (parsedResponse.ErrorMessage === "Package expired") {
          toast.error(
            "Package expired go to Pay the subscription with Mr:Abdallah phone: +201062949856"
          );
        }

        var gradesNum = parsedResponse.grades;

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
    } catch (error) {
      console.error(error);
    }
  }

  function handelSelected(event) {
    const selectedValueMajor = event.target.value;
    setValue(selectedValueMajor);
  }

  function handelSelectedGroup(event) {
    const selectedValuegroup = event.target.value;
    setValueOfGroupNumber(selectedValuegroup);
  }

  function handelSelectedDescription(event) {
    const valueGroup = event.target.value;
    setValueOfDescription(valueGroup);
  }

  function handleSelectedYear(event) {
    const selectedValueYear = event.target.value;
    setValueYear(selectedValueYear);
  }
  const handleSubjectSelect = (event) => {
    const selectedSubject = event.target.value;
    console.log(selectedSubject);
    setSelectedSubject(event.target.value); // Update the selected subject state
  };

  return (
    <>
      <Helmet>
        <title>Create Group</title>
      </Helmet>

      <div className="d-flex justify-content-center align-items-center my-5">
        <h1 className="fw-bold" style={{ color: "rgba(82, 95, 224, 1)" }}>
          Create Group
        </h1>
      </div>

      <section>
        <div className=" d-flex justify-content-center align-items-center">
          <div className="form-control w-50" id="accordionExample">
            <div className="d-flex justify-content-center align-items-center my-3">
              <div className="w-100">
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
                  <button
                    className="btn"
                    onClick={() => setShowInput(!showInput)}
                  >
                    Other Subject
                  </button>
                </div>

                {showInput && (
                  <div className="form-floating mb-3">
                    <input
                      onChange={(event) => {
                        const selectedSubject = event.target.value;
                        handleSubjectSelect(event);
                        setSelectedSubject(selectedSubject);
                      }}
                      type="text"
                      className="form-control mb-3 w-100"
                      id="subject_name"
                      placeholder="Enter your Subject"
                    />
                    <label htmlFor="subject_name">Subject</label>
                  </div>
                )}

                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => {
                      const selectedValueYear = event.target.value;
                      handelSelectedGroup(event);
                    }}
                    value={user.subject_group}
                    type="text"
                    className="form-control mb-3 w-100"
                    id="subject_group"
                    placeholder="Enter your Group number"
                  />
                  <label htmlFor="subject_group">Group number</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    onChange={(event) => {
                      const selectedValueYear = event.target.value;
                      handelSelectedDescription(event);
                    }}
                    value={user.description}
                    type="text"
                    className="form-control mb-3 w-100"
                    id="description"
                    placeholder="Enter your Group Description "
                  />
                  <label htmlFor="description">Group Description</label>
                </div>

                <button
                  onClick={() =>
                    craeteGroupRequest(value, valueYear, selectedSubject)
                  }
                  className="btn w-100 text-white py-2"
                  style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Creategroup;
