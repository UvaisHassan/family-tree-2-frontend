import { useState, useEffect } from "react";
import MemberInfo from "../components/MemberInfo";
import MemberList from "../components/MemberList";

function App() {
  const [rootMember, setRootMember] = useState();
  const [spouses, setSpouses] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [children, setChildren] = useState([]);

  const fetchData = async(url, setStateFunction) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setStateFunction(data);
    } catch (error) {
      console.log("Error:", error);
    }
  }  

  useEffect(() => {
    fetchData("http://localhost:2345/api/members/1", setRootMember);
    fetchData("http://localhost:2345/api/members/1/spouses", setSpouses);
    fetchData("http://localhost:2345/api/members/1/siblings", setSiblings);
    fetchData("http://localhost:2345/api/members/1/children", setChildren);
  }, []);

  return (
    <>
      <MemberInfo title="Root Member" data={rootMember} />
      <MemberList title="Spouses" data={spouses} />
      <MemberList title="Siblings" data={siblings} />
      <MemberList title="Children" data={children} />
    </>
  );
}

export default App;
