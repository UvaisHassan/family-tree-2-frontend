const FormMemberList = ({ members, field_name, handleMemberSelect }) => {
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
    </ul>
  );
};

export default FormMemberList;
