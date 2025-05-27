import "./App.css";

import Header from "./components/layout/Header/Header";
import ShoppingCart from "./components/shoppingCart/ShoppingCart/ShoppingCart";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <>
      <Header>SHOP</Header>
      <ShoppingCart />
      <Footer text="주문 확인" />
    </>
  );
}

export default App;
