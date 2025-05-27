import "./reset.css";
import "./App.css";
import logo from "/public/logo.svg";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header icon={logo} handleIconClick={() => alert("클릭")} />
    </>
  );
}

export default App;
