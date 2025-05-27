import "./App.css";
import Header from "./components/common/Header/Header";
import HeaderButton from "./components/common/Header/HeaderButton";
import { Logo } from "./assets";
import globalStyles from "./styles/global.styles";
import { Global } from "@emotion/react";

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
      <h1>react-shopping-cart</h1>
    </>
  );
}

export default App;
