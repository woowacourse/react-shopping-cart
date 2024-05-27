import AddButton from "@/components/AddButton/AddButton";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import Footer from "@/components/Footer/Footer";
import CartTitle from "@/components/Cart/CartTitle/CartTitle";
import CartItemContainer from "@/components/Cart/CartItemContainer/CartItemContainer";
import CartResults from "@/components/Cart/CartResults/CartResults";
import Error from "@/components/Fallbacks/Error";

import { ErrorBoundary } from "react-error-boundary";

import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, checkAllItemState } from "@/store/atom/atoms";

import CartDescription from "@/components/Cart/CartDescription/CartDescription";
import CartItemList from "@/components/Cart/CartItemContainer/CartItemList/CartItemList";
import { Suspense } from "react";
import Loading from "@/components/Fallbacks/Loading";
import ToolBar from "@/components/ToolBar/ToolBar";
import { SHIPPING_CONSTANT } from "@/constants";
import { orderAmountState, totalAmountState } from "@/store/selector/selectors";
import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";
import Divider from "@/components/Divider/Divider";

const Cart = () => {
  const itemCount = useRecoilValue(cartState).length;
  const orderAmount = useRecoilValue(orderAmountState);
  const totalAmount = useRecoilValue(totalAmountState);
  const [isAllCheck, setIsAllCheck] = useRecoilState(checkAllItemState);
  const handleToolbarClick = () => {
    setIsAllCheck((prev) => !prev);
  };

  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={Error}>
        <Main>
          <div>
            <CartTitle>SHOP</CartTitle>
            {itemCount !== 0 && <CartDescription>현재 {itemCount}종류의 상품이 담겨 있습니다.</CartDescription>}
          </div>
          <CartItemContainer>
            <ToolBar handleCheck={handleToolbarClick} isCheck={isAllCheck}>
              전체 선택
            </ToolBar>
            <Suspense fallback={<Loading />}>
              <CartItemList />
            </Suspense>
          </CartItemContainer>
          <CartResults>
            <PaymentDetail
              title="배송비"
              amount={orderAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? 0 : SHIPPING_CONSTANT.FEE}
            />
            <Divider />
            <PaymentDetail title="총 결제 금액" amount={totalAmount} />
          </CartResults>
        </Main>
        <Footer />
      </ErrorBoundary>
      {import.meta.env.DEV && <AddButton />}
    </>
  );
};

export default Cart;
