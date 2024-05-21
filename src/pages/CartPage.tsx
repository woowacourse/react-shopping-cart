import Header from "../components/Header/Header";
import AddButton from "../components/AddButton/AddButton";
import { Suspense } from "react";
import CartFooter from "../components/Cart/CartFooter/CartFooter";
import CartContent from "../components/Cart/CartContent/CartContent";
import LoadingPage from "../components/common/LoadingSpinner/LoadingPage";

const CartPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <CartContent />
        <CartFooter />
      </Suspense>
      {process.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default CartPage;
