import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  CartPrice,
} from "../components";
import { CartLayout } from "../layouts/";

const CartPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <CartLayout>
          <CartDescription />
          <CartItemList />
          <CartPrice />
        </CartLayout>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CartPage;
