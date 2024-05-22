import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  CartPrice,
  Loading,
} from "@/components/index";

import CartLayout from "@/layouts/Cart";
import HomeButton from "@/components/button/HomeButton";
import ErrorFallback from "@/components/_common/ErrorFallback";

const CartPage = () => {
  return (
    <>
      <Header>
        <HomeButton />
      </Header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <CartLayout>
            <CartDescription />
            <CartItemList />
            <CartPrice />
          </CartLayout>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default CartPage;
