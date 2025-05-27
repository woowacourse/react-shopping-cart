import "./reset.css";
import "./App.css";
import logo from "/public/logo.svg";
import Header from "./components/Header/Header";
import Description from "./components/Description/Description";

function App() {
  return (
    <>
      <Header icon={logo} handleIconClick={() => alert("클릭")} />
      <Description cartItemCount={2} />
    </>
  );
}

export default App;
