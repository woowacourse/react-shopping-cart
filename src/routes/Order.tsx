import React, { Suspense } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Loading from "@/components/Fallbacks/Loading";
import RouteInfoProvider from "@/Providers/RouteInfoProvider";

const OrderContainer = React.lazy(() => import("@/components/Main/Order/OrderContainer"));

const Order = () => {
  return (
    <RouteInfoProvider>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          <OrderContainer />
        </Suspense>
      </Main>
      <Footer />
    </RouteInfoProvider>
  );
};

export default Order;
