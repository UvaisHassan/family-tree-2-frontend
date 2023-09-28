const MemberInfo = ({ title, data }) => {
  return (
    <section>
      <h2>{title}</h2>
      {data ? (
        <p>{data.name}</p>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default MemberInfo;