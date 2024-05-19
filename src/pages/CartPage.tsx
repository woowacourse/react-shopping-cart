import Header from "../components/Header/Header";
import CartContent from "../components/Main/Cart/CartContent/CartContent";
import AddButton from "../components/AddButton/AddButton";
import { Suspense } from "react";
import CartFooter from "../components/Footer/CartFooter/CartFooter";

const CartPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>outer</div>}>
        <CartContent />
        <CartFooter />
      </Suspense>
      {import.meta.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default CartPage;
