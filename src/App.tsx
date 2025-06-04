import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Main from "./pages/Main";
import Confirm from "./pages/Confirm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </>
  );
}

export default App;
