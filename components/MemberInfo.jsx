const MemberInfo = ({ data }) => {
  return <section>{data ? <h2>{data.name}</h2> : <p>Loading...</p>}</section>;
};

export default MemberInfo;
