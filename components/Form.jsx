import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import InputField from "./InputField";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
  });

  const [activeField, setActiveField] = useState("");

  const API_URL = "http://localhost:2345/api/members/search";
  const {
    data: members,
    setData: setMembers,
    query,
    setQuery,
  } = useApi(API_URL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (
      name === "father_name" ||
      name === "mother_name" ||
      name === "spouse_name"
    ) {
      setQuery(value);
      setActiveField(name);

      if (value === "") {
        setMembers([]);
      }
    }
  };

  const handleMemberSelect = (name, selectedMember) => {
    setFormData({ ...formData, [name]: selectedMember.name });

    const fieldNameToId = {
      father_name: "father_id",
      mother_name: "mother_id",
      spouse_name: "spouse_id",
    };

    const idFieldName = fieldNameToId[name];
    if (idFieldName) {
      setFormData((prevData) => ({
        ...prevData,
        [idFieldName]: selectedMember._id,
      }));
    }

    setMembers([]);
    setActiveField("");
  };

  const postData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData(`http://localhost:2345/api/members`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <div>
        <label>Gender: </label>M{" "}
        <input
          type="radio"
          name="gender"
          value="M"
          onChange={handleInputChange}
        />
        F{" "}
        <input
          type="radio"
          name="gender"
          value="F"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <InputField
          label="Father"
          name="father_name"
          value={formData.father_name}
          onChange={handleInputChange}
        />
        {query !== "" && activeField === "father_name" && (
          <ul>
            {members.map((member) => (
              <li
                key={member._id}
                onClick={() => handleMemberSelect("father_name", member)}
              >
                {member.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <InputField
          label="Mother"
          name="mother_name"
          value={formData.mother_name}
          onChange={handleInputChange}
        />

        {query !== "" && activeField === "mother_name" && (
          <ul>
            {members.map((member) => (
              <li
                key={member._id}
                onClick={() => handleMemberSelect("mother_name", member)}
              >
                {member.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <InputField
          label="Spouse"
          name="spouse_name"
          value={formData.spouse_name}
          onChange={handleInputChange}
        />

        {query !== "" && activeField === "spouse_name" && (
          <ul>
            {members.map((member) => (
              <li
                key={member._id}
                onClick={() => handleMemberSelect("spouse_name", member)}
              >
                {member.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
