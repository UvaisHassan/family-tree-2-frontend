const MemberList = ({ title, data, onClick }) => {
  return (
    <section>
      <h2>{title}</h2>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id} onClick={() => onClick(item.id)}>
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