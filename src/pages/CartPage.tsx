import { Suspense } from "react";
import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  CartPrice,
  Loading,
} from "../components";

import CartLayout from "../layouts/Cart";
import HomeButton from "../components/button/HomeButton";

const CartPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Header>
        <HomeButton />
      </Header>
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
