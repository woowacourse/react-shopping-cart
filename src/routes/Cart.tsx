import AddButton from "../components/AddButton/AddButton";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import CartTitle from "../components/Main/Cart/CartTitle/CartTitle";
import CartItemContainer from "../components/Main/Cart/CartItemContainer/CartItemContainer";
import CartResults from "../components/Main/Cart/CartResults/CartResults";

const Cart = () => {
  return (
    <>
      <Header />
      <Main>
        <CartTitle />
        <CartItemContainer />
        <CartResults />
      </Main>
      <Footer />
      {import.meta.env.DEV && <AddButton />}
    </>
  );
};

export default Cart;
