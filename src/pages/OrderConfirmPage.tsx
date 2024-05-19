import { Suspense } from "react";

import { Header, Footer, OrderConfirm, Loading } from "../components";
import BackButton from "../components/button/BackButton";
import CartLayout from "../layouts/Cart";

const OrderConfirmPage = () => {
  return (
    <Suspense fallback={<Loading />}>
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
