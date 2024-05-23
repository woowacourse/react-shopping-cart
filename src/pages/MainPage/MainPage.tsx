import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartList,
  Header,
  Footer,
  CartPrice,
} from "../../components";
import { AppLayout } from "../../layouts";

const MainPage = () => {
  return (
    <AppLayout>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <Header>SHOP</Header>
          <CartDescription />
          <CartList />
          <CartPrice />
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </AppLayout>
  );
};

export default MainPage;
