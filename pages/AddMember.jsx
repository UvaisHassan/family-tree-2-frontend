import { useState, useEffect } from "react";

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
  });
  const [formDataForSubmit, setFormDataForSubmit] = useState({
    name: "",
    gender: "",
    birthday: "",
    father_id: null,
    mother_id: null,
    spouse_id: null,
  });

  const [members, setMembers] = useState([]);
  const [filteredFatherMembers, setFilteredFatherMembers] = useState([]);
  const [filteredMotherMembers, setFilteredMotherMembers] = useState([]);
  const [filteredSpouseMembers, setFilteredSpouseMembers] = useState([]);

  const fetchMembers = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchMembers(`http://localhost:2345/api/members`);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name" || name === "gender") {
      setFormDataForSubmit({ ...formDataForSubmit, [name]: value });
    }

    if (value === "") {
      setFilteredFatherMembers([]);
      setFilteredMotherMembers([]);
      setFilteredSpouseMembers([]);
    } else {
      const filtered = members.filter((member) =>
        member.name.toLowerCase().startsWith(value.toLowerCase())
      );

      if (name === "father_name") {
        setFilteredFatherMembers(filtered);
      } else if (name === "mother_name") {
        setFilteredMotherMembers(filtered);
      } else if (name === "spouse_name") {
        setFilteredSpouseMembers(filtered);
      }
    }
  };

  const handleMemberSelect = (name, selectedMember) => {
    setFormData({ ...formData, [name]: selectedMember.name });

    if (name === "father_name") {
      setFormDataForSubmit({
        ...formDataForSubmit,
        father_id: selectedMember._id,
      });
    } else if (name === "mother_name") {
      setFormDataForSubmit({
        ...formDataForSubmit,
        mother_id: selectedMember._id,
      });
    } else if (name === "spouse_name") {
      setFormDataForSubmit({
        ...formDataForSubmit,
        spouse_id: selectedMember._id,
      });
    }

    setFilteredFatherMembers([]);
    setFilteredMotherMembers([]);
    setFilteredSpouseMembers([]);
  };

  const postData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataForSubmit),
      });
      const data = await response.json();
      console.log(data);

      fetchMembers(`http://localhost:2345/api/members`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData(`http://localhost:2345/api/members`);
  };

  return (
    <div>
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
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
          <label>Father: </label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleInputChange}
          />
          {filteredFatherMembers.length > 0 && (
            <ul>
              {filteredFatherMembers.map((member) => (
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
          <label>Mother: </label>
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleInputChange}
          />
          {filteredMotherMembers.length > 0 && (
            <ul>
              {filteredMotherMembers.map((member) => (
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
          <label>Spouse: </label>
          <input
            type="text"
            name="spouse_name"
            value={formData.spouse_name}
            onChange={handleInputChange}
          />
          {filteredSpouseMembers.length > 0 && (
            <ul>
              {filteredSpouseMembers.map((member) => (
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
    </div>
  );
};

export default AddMember;
