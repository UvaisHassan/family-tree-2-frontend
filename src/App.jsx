import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddMember from "../pages/AddMember";
import Header from "../components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addmember" element={<AddMember />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
