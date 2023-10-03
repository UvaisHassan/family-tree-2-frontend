const MemberList = ({ title, data, onClick }) => {
  return (
    data.length > 0 && (
      <section>
        <h3>{title}</h3>
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
    )
  );
};

export default MemberList;
