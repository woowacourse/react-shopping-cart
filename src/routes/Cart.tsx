import AddButton from "../components/AddButton/AddButton";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";

const Cart = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      {process.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default Cart;
