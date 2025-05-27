import Header from "./components/layout/header/Header";
import GlobalStyle from "./styles/GlobalStyles";
import CartItem from "./components/features/cartItem/CartItem";
import { Global } from "@emotion/react";

interface CartItem {
  id: string;
  product: {
    imageUrl: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const mockCartData = {
  id: "1",
  product: {
    imageUrl: "https://via.placeholder.com/150",
    name: "상품1",
    price: 1000,
  },
  quantity: 1,
};

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />
      <CartItem cartData={mockCartData} />
    </>
  );
}

export default App;
