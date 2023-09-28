const MemberList = ({ title, data }) => {
  return (
    <section>
      <h2>{title}</h2>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default MemberList;