import React, { Suspense } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Loading from "@/components/Fallbacks/Loading";
const OrderContainer = React.lazy(() => import("@/components/Main/Order/OrderContainer"));

const Order = () => {
  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          <OrderContainer />
        </Suspense>
      </Main>
      <Footer />
    </>
  );
};

export default Order;
