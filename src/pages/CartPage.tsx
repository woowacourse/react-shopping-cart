/** @jsxImportSource @emotion/react */
import Header from "../components/Header/Header";
import AddButton from "../components/AddButton/AddButton";
import { Suspense } from "react";
import CartFooter from "../components/Cart/CartFooter/CartFooter";
import CartContent from "../components/Cart/CartContent/CartContent";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";

const CartPage = () => {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <CartContent />
          <CartFooter />
        </Suspense>
      </ErrorBoundary>

      {process.env.DEV ? <AddButton /> : null}
    </>
  );
};

export default CartPage;
