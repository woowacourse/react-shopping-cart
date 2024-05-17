import { Suspense } from "react";
import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  CartPrice,
} from "../components";
import { ErrorBoundary } from "react-error-boundary";

import CartLayout from "../layouts/Cart";

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
