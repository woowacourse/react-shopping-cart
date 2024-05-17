import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import AddButton from "../components/AddButton/AddButton";
import { Suspense } from "react";

const Cart = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>outer</div>}>
        <Main />
        <Footer />
      </Suspense>
      {import.meta.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default Cart;
