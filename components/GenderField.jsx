const GenderField = ({ handleInputChange }) => {
  return (
    <div>
      <label>Gender: </label>
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        name="gender"
        id="male"
        value="M"
        onChange={handleInputChange}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        name="gender"
        id="female"
        value="F"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default GenderField;
