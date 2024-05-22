import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartList,
  Header,
  Footer,
  CartPrice,
} from "../../components";
import { CartLayout } from "../../layouts";

const MainPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense fallback={<div>Loading</div>}>
        <Header />
        <CartLayout>
          <CartDescription />
          <CartList />
          <CartPrice />
        </CartLayout>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainPage;
