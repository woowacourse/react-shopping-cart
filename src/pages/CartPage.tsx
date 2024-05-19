import Header from "../components/Header/Header";
import AddButton from "../components/AddButton/AddButton";
import { Suspense } from "react";
import CartFooter from "../components/Footer/CartFooter/CartFooter";
import CartContent from "../components/Cart/CartContent/CartContent";

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
