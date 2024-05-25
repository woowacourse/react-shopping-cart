import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { cartState, isExtraShippingFeeState } from "@/store/atom/atoms";
import { useModalAction } from "easy-payments-ui";

import useCustomContext from "@/hooks/useCustomContext";
import { MainRouteInfoContext, RoutePaths } from "@/Providers/RouteInfoProvider";

import CartDescription from "@/components/Cart/CartDescription/CartDescription";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CartTitle from "@/components/Cart/CartTitle/CartTitle";
import Main from "@/components/Main/Main";
import CartItemContainer from "@/components/Cart/CartItemContainer/CartItemContainer";
import CartItemCheckedList from "@/components/Cart/CartItemContainer/CartItemCheckedList/CartItemCheckedList";
import Button from "@/components/Button/Button";
import ToolBar from "@/components/ToolBar/ToolBar";
import CartResults from "@/components/Cart/CartResults/CartResults";
import CouponModal from "@/components/CouponModal/CouponModal";
import CouponList from "@/components/CouponModal/CouponList/CouponList";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/components/Fallbacks/Error";
import Loading from "@/components/Fallbacks/Loading";
import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";
import { checkedCouponList, orderAmountState, totalAmountState } from "@/store/selector/selectors";
import useCouponCalculate from "@/hooks/useCouponCalculate";
import { SHIPPING_CONSTANT } from "@/constants";
import Divider from "@/components/Divider/Divider";

const CheckOrder = () => {
  const itemCount = useRecoilValue(cartState).length;
  const checkedCoupons = useRecoilValue(checkedCouponList);
  const orderAmount = useRecoilValue(orderAmountState);
  const totalAmount = useRecoilValue(totalAmountState);
  const { discountAmount } = useCouponCalculate(checkedCoupons);
  const isExtraShippingFee = useRecoilValue(isExtraShippingFeeState);

  const SHIPPING_FEE = isExtraShippingFee ? SHIPPING_CONSTANT.EXTRA_FEE : SHIPPING_CONSTANT.FEE;

  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const MainInfo = useCustomContext(MainRouteInfoContext)[pathname];
  const action = useModalAction();

  const [isDoSeoSanGan, setIsDoSeoSanGan] = useRecoilState(isExtraShippingFeeState);
  const handleToolbarCheck = () => {
    setIsDoSeoSanGan((prev) => !prev);
  };

  const handleCouponButtonClick = () => {
    action.handleOpen();
  };

  return (
    <>
      <Header />
      <Main>
        <div>
          <CartTitle>주문 확인</CartTitle>
          {itemCount !== 0 && <CartDescription>현재 {itemCount}종류의 상품이 담겨 있습니다.</CartDescription>}
          {MainInfo.cartDescription && <CartDescription>{MainInfo.cartDescription}</CartDescription>}
        </div>
        <CartItemContainer>
          <CartItemCheckedList />
        </CartItemContainer>
        <Button width="100%" height="48px" fontSize="15px" onClick={handleCouponButtonClick}>
          쿠폰 적용
        </Button>
        <ToolBar handleCheck={handleToolbarCheck} isCheck={isDoSeoSanGan}>
          제주도 및 도서 산간 지역
        </ToolBar>
        <CartResults>
          <CartResults>
            <PaymentDetail title="쿠폰 할인 금액" amount={discountAmount} />
            <PaymentDetail title="배송비" amount={orderAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? 0 : SHIPPING_FEE} />
            <Divider />
            <PaymentDetail title="총 결제 금액" amount={totalAmount - discountAmount} />
          </CartResults>
        </CartResults>
      </Main>

      {/*---MODAL---*/}
      <CouponModal>
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<Loading />}>
            <CouponList />
          </Suspense>
        </ErrorBoundary>
      </CouponModal>
      <Footer />
    </>
  );
};

export default CheckOrder;
