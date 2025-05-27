import "./reset.css";
import "./App.css";
import logo from "/public/logo.svg";
import Header from "./components/Header/Header";
import Description from "./components/Description/Description";
import CartItem from "./components/CartItem/CartItem";
import CheckBox from "./components/CheckBox/CheckBox";
import Receipt from "./components/Receipt/Receipt";

function App() {
  return (
    <>
      <Header icon={logo} handleIconClick={() => alert("클릭")} />
      <Description cartItemCount={2} />
      <CheckBox id="234" label="전체선택" />
      <CartItem />
      <Receipt />
    </>
  );
}

export default App;
