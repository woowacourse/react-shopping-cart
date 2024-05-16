import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import AddButton from "../components/AddButton/AddButton";

const Cart = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      {import.meta.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default Cart;
