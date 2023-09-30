const MemberList = ({ title, data, onClick }) => {
  return (
    <section>
      <h2>{title}</h2>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item._id} onClick={() => onClick(item._id)}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default MemberList;
