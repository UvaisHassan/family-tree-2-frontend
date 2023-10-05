const FormMemberList = ({
  members,
  field_name,
  handleMemberSelect,
  new_name,
  setIsSpouseNew,
}) => {
  const characters = "abcdef0123456789";
  const randomString = () => {
    let result = "";

    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * 16));
    }

    return result;
  };

  return (
    <ul>
      {members.map((member) => (
        <li
          key={member._id}
          onClick={() => handleMemberSelect(field_name, member)}
        >
          {member.name}
        </li>
      ))}
      {field_name === "spouse_name" && (
        <li
          onClick={() => {
            handleMemberSelect(field_name, {
              _id: randomString(),
              name: new_name,
            });
            setIsSpouseNew(true);
          }}
        >
          Create member "{new_name}"
        </li>
      )}
    </ul>
  );
};

export default FormMemberList;
