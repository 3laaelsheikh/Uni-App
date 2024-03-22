import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { mygroupsContext } from "../Context/Mygroups";
import { FallingLines } from "react-loader-spinner";

const Uploaddetails = ({ data }) => {
  const {
    subjectName,
    subjectGroup,
    description,
    majore,
    year,
    startedGroups,
    setStartedGroups,
  } = useContext(mygroupsContext);

  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function handelSelected(event) {
    const selectedValueMajor = event.target.value;
    setValue(selectedValueMajor)
    console.log(selectedValueMajor);
}


  const handleSubmit = async (event) => {
    event.preventDefault();
    let file_type = value

    // Create a new FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("majore", data.majore);
    formDataToSend.append("subject_name", data.subject_name);
    formDataToSend.append("year", data.year);
    formDataToSend.append("subject_group", data.subject_group);
    formDataToSend.append("file_type", file_type);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("file", file);

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://sinai-college-project.onrender.com/api/v1/upload",
        {
          method: "POST",
          body: formDataToSend,
          headers: { Authorization: localStorage.getItem("tkn") },
        }
      );

      console.log(formDataToSend);
      console.log(response);
      console.log(value);

      if (response.status == 200) {
        toast.success("File uploaded successfully!");
        console.log(formDataToSend);
      } else {
        toast.error("Error uploading file");
        console.log(formDataToSend);
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);

    console.log("Form data submitted:", formDataToSend);
  };


  

  return (
    <div className="my-5 py-5 d-flex justify-content-center align-items-center">
      <form className="form-control w-50" onSubmit={handleSubmit}>
        <div className="my-2">
          <select
            className="form-select"
            onChange={(event) => {
              const selectedValue = event.target.value;
              handelSelected(event);
              setValue(selectedValue);
            }}
            aria-label="Default select example"
          >
            <option selected disabled>
            file_type
            </option>
            <option value="video">video</option>
            <option value="file">file</option>
          </select>
        </div>

      
        <input
          type="text"
          name="title"
          className="form-control mt-2"
          placeholder="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="file"
          className="form-control mt-2"
          placeholder="choose Video"
          value={formData.file}
          onChange={handleFileChange}
        />
        <button
          className="btn text-white w-100 mt-2"
          style={{ backgroundColor: "rgba(82, 95, 224, 1)" }}
          type="submit"
        >
          {isLoading ? (
            <FallingLines
              color="#fff"
              width="30"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Uploaddetails;


