import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import CouponModal from "@/components/CouponModal/CouponModal";
import CouponList from "@/components/CouponModal/CouponList/CouponList";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/components/Fallbacks/Error";
import Loading from "@/components/Fallbacks/Loading";

import CheckOrderContainer from "@/components/CheckOrderContainer/CheckOrderContainer";

const CheckOrder = () => {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Loading />}>
          <Main>
            <CheckOrderContainer />
          </Main>

          {/*---MODAL---*/}
          <CouponModal>
            <CouponList />
          </CouponModal>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default CheckOrder;
