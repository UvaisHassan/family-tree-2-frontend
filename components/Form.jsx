import { useState } from "react";
import useApi from "../hooks/useApi";
import InputField from "./InputField";
import FormMemberList from "./FormMemberList";
import GenderField from "./GenderField";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
  });

  const [activeField, setActiveField] = useState("");
  const [isSpouseNew, setIsSpouseNew] = useState(false);

  const API_URL = "http://localhost:2345/api/members";
  const API_URL_SEARCH = "http://localhost:2345/api/members/search";

  const {
    data: members,
    setData: setMembers,
    query,
    setQuery,
  } = useApi(API_URL_SEARCH);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (isSpouseNew) {
        const newMemberResponse = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: formData.spouse_id,
            name: formData.spouse_name,
            gender: formData.gender === "M" ? "F" : "M",
            spouse_id: data._id,
          }),
        });
        const newMemberData = await newMemberResponse.json();
        console.log(newMemberData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <GenderField handleInputChange={handleInputChange} />
      <div>
        <InputField
          label="Father"
          name="father_name"
          value={formData.father_name}
          onChange={handleInputChange}
        />
        {activeField === "father_name" && query !== "" && (
          <FormMemberList
            members={members}
            field_name="father_name"
            handleMemberSelect={handleMemberSelect}
            new_name={formData.father_name}
            setIsSpouseNew={setIsSpouseNew}
          />
        )}
      </div>
      <div>
        <InputField
          label="Mother"
          name="mother_name"
          value={formData.mother_name}
          onChange={handleInputChange}
        />

        {activeField === "mother_name" && query !== "" && (
          <FormMemberList
            members={members}
            field_name="mother_name"
            handleMemberSelect={handleMemberSelect}
            new_name={formData.mother_name}
            setIsSpouseNew={setIsSpouseNew}
          />
        )}
      </div>
      <div>
        <InputField
          label="Spouse"
          name="spouse_name"
          value={formData.spouse_name}
          onChange={handleInputChange}
        />

        {activeField === "spouse_name" && query !== "" && (
          <FormMemberList
            members={members}
            field_name="spouse_name"
            handleMemberSelect={handleMemberSelect}
            new_name={formData.spouse_name}
            setIsSpouseNew={setIsSpouseNew}
          />
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
