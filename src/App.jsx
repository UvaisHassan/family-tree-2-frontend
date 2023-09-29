import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddMember from "../pages/AddMember";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addmember" element={<AddMember />} />
    </Routes>
  );
}

export default App;
