import AddButton from "@/components/AddButton/AddButton";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";
import CartTitle from "@/components/Main/Cart/CartTitle/CartTitle";
import CartItemContainer from "@/components/Main/Cart/CartItemContainer/CartItemContainer";
import CartResults from "@/components/Main/Cart/CartResults/CartResults";
import Error from "@/components/Fallbacks/Error";

import { ErrorBoundary } from "react-error-boundary";
import RouteInfoProvider from "@/Providers/RouteInfoProvider";

const Cart = () => {
  return (
    <RouteInfoProvider>
      <Header />
      <ErrorBoundary FallbackComponent={Error}>
        <Main>
          <CartTitle>SHOP</CartTitle>
          <CartItemContainer />
          <CartResults />
        </Main>
        <Footer />
      </ErrorBoundary>
      {import.meta.env.DEV && <AddButton />}
    </RouteInfoProvider>
  );
};

export default Cart;
