import { Suspense } from "react";
import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  CartPrice,
} from "../components";

import CartLayout from "../layouts/Cart";

const CartPage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Header />
      <CartLayout>
        <CartDescription />
        <CartItemList />
        <CartPrice />
      </CartLayout>
      <Footer />
    </Suspense>
  );
};

export default CartPage;
