import { useState, useEffect } from "react";
import MemberInfo from "../components/MemberInfo";
import MemberList from "../components/MemberList";

const Home = () => {
  const [rootMemberId, setRootMemberId] = useState("5f6a07f8554bfc5f734e9bf2");
  const [rootMember, setRootMember] = useState();
  const [parents, setParents] = useState([]);
  const [spouses, setSpouses] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [children, setChildren] = useState([]);

  const fetchData = async (url, setStateFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStateFunction(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClick = (memberId) => {
    setRootMemberId(memberId);
  };

  useEffect(() => {
    fetchData(
      `http://localhost:2345/api/members/${rootMemberId}`,
      setRootMember
    );
    fetchData(
      `http://localhost:2345/api/members/${rootMemberId}/parents`,
      setParents
    );
    fetchData(
      `http://localhost:2345/api/members/${rootMemberId}/spouses`,
      setSpouses
    );
    fetchData(
      `http://localhost:2345/api/members/${rootMemberId}/siblings`,
      setSiblings
    );
    fetchData(
      `http://localhost:2345/api/members/${rootMemberId}/children`,
      setChildren
    );
  }, [rootMemberId]);

  return (
    <>
      <MemberInfo data={rootMember} />
      <MemberList title="Parents" data={parents} onClick={handleClick} />
      <MemberList title="Married to" data={spouses} onClick={handleClick} />
      <MemberList title="Siblings" data={siblings} onClick={handleClick} />
      <MemberList title="Children" data={children} onClick={handleClick} />
    </>
  );
};

export default Home;
