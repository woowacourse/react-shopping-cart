import { useModalAction } from "easy-payments-ui";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { MainRouteInfoContext } from "@/Providers/RouteInfoProvider/RouteInfoProvider";
import { SHIPPING_CONSTANT } from "@/constants";
import useCouponCalculate from "@/hooks/useCouponCalculate";
import useCustomContext from "@/hooks/useCustomContext";
import { cartState, isExtraShippingFeeState } from "@/store/atom/atoms";
import { checkedCouponList, orderAmountState, totalAmountState } from "@/store/selector/selectors";

import CartTitle from "../Cart/CartTitle/CartTitle";
import CartDescription from "../Cart/CartDescription/CartDescription";
import CartItemContainer from "../Cart/CartItemContainer/CartItemContainer";
import CartItemCheckedList from "../Cart/CartItemContainer/CartItemCheckedList/CartItemCheckedList";
import Button from "../Button/Button";
import ToolBar from "../ToolBar/ToolBar";
import CartResults from "../Cart/CartResults/CartResults";
import PaymentDetail from "../PaymentDetail/PaymentDetail";
import Divider from "../Divider/Divider";
import { RoutePaths } from "@/Providers/RouteInfoProvider/useRouteInfo";

const CheckOrderContainer = () => {
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
    </>
  );
};

export default CheckOrderContainer;
