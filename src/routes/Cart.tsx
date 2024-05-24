import AddButton from "@/components/AddButton/AddButton";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";
import CartTitle from "@/components/Main/Cart/CartTitle/CartTitle";
import CartItemContainer from "@/components/Main/Cart/CartItemContainer/CartItemContainer";
import CartResults from "@/components/Main/Cart/CartResults/CartResults";
import Error from "@/components/Fallbacks/Error";

import { ErrorBoundary } from "react-error-boundary";

import { useRecoilValue } from "recoil";
import { cartState } from "@/store/atom/atoms";

import CartDescription from "@/components/Main/Cart/CartDescription/CartDescription";

const Cart = () => {
  const itemCount = useRecoilValue(cartState).length;

  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={Error}>
        <Main>
          <div>
            <CartTitle>SHOP</CartTitle>
            {itemCount !== 0 && <CartDescription>현재 {itemCount}종류의 상품이 담겨 있습니다.</CartDescription>}
          </div>
          <CartItemContainer />
          <CartResults />
        </Main>
        <Footer />
      </ErrorBoundary>
      {import.meta.env.DEV && <AddButton />}
    </>
  );
};

export default Cart;
