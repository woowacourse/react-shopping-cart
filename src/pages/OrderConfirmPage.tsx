import { Suspense } from "react";

import { Header, Footer, OrderConfirm } from "../components";
import BackButton from "../components/button/BackButton";
import CartLayout from "../layouts/Cart";

const OrderConfirmPage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Header>
        <BackButton />
      </Header>
      <CartLayout>
        <OrderConfirm />
      </CartLayout>
      <Footer />
    </Suspense>
  );
};

export default OrderConfirmPage;
