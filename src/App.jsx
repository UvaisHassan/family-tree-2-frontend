import { useState, useEffect } from "react";

function App() {
  const [rootMember, setRootMember] = useState();
  const [spouses, setSpouses] = useState([]);
  const [siblings, setSiblings] = useState([]);
  const [children, setChildren] = useState([]);


  useEffect(() => {
    const fetchRootMember = async() => {
      try {
        const response = await fetch("http://localhost:2345/api/members/1");
        const data = await response.json();
        console.log(data);

        setRootMember(data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchRootMember();
    
    const fetchSpouses = async() => {
      try {
        const response = await fetch("http://localhost:2345/api/members/1/spouses");
        const data = await response.json();

        setSpouses(data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchSpouses();
    
    const fetchSiblings = async() => {
      try {
        const response = await fetch("http://localhost:2345/api/members/1/siblings");
        const data = await response.json();

        setSiblings(data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchSiblings();
    
    const fetchChildren = async() => {
      try {
        const response = await fetch("http://localhost:2345/api/members/1/children");
        const data = await response.json();

        setChildren(data);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchChildren();
  }, []);

  return (
    <>
      <section>
        <h2>Root Member</h2>
        {rootMember ? <p>{rootMember.name}</p> : <p>Loading...</p>}
      </section>
      <section>
        <h2>Spouses</h2>
        {spouses ?
        <ul>
          {spouses.map((spouse) => <li>{spouse.name}</li>)}
        </ul>
        :
        <p>Loading...</p>
        }
      </section>
      <section>
        <h2>Siblings</h2>
        {siblings ?
        <ul>
          {siblings.map((sibling) => <li>{sibling.name}</li>)}
        </ul>
        :
        <p>Loading...</p>
        }
      </section>
      <section>
        <h2>Children</h2>
        {children ?
        <ul>
          {children.map((child) => <li>{child.name}</li>)}
        </ul>
        :
        <p>Loading...</p>
        }
      </section>
    </>
  );
}

export default App;
