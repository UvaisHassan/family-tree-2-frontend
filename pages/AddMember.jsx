import { useState, useEffect } from "react";

const AddMember = () => {
  const [formData, setFormData] = useState({
    father_name: "",
    mother_name: "",
    spouse_name: "",
  });

  const [members, setMembers] = useState([]);
  const [filteredFatherMembers, setFilteredFatherMembers] = useState([]);
  const [filteredMotherMembers, setFilteredMotherMembers] = useState([]);
  const [filteredSpouseMembers, setFilteredSpouseMembers] = useState([]);

  const fetchData = async (url, setStateFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStateFunction(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(`http://localhost:2345/api/members`, setMembers);
  });

  const handleInputChange = (e) => {
    console.log("beep");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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
    setFilteredFatherMembers([]);
    setFilteredMotherMembers([]);
    setFilteredSpouseMembers([]);
  };

  return (
    <div>
      <h2>Add Member</h2>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Gender: </label>
          M <input type="radio" name="gender" value="m" />
          F <input type="radio" name="gender" value="f" />
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
                  key={member.id}
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
                  key={member.id}
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
                  key={member.id}
                  onClick={() => handleMemberSelect("spouse_name", member)}
                >
                  {member.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMember;
