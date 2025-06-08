import * as S from "./OrderConfirmPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import LoadingSpinner from "../../components/icons/LoadingSpinner";
import OrderCardList from "./components/OrderCardList";
import PaymentPriceList from "./components/PaymentPriceList";
import CouponModal from "./components/CouponModal";
import DeliveryOptions from "./components/DeliveryOptions";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useOrderState } from "./hooks/useOrderState";

const OrderConfirmPage = () => {
  const { state: orderItems } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const orderState = useOrderState({ orderItems });
  const handleNavigate = () => navigate("/payment-success");
  return (
    <S.Container>
      <Text variant="title-1">주문 확인</Text>
      <S.Information>
        <Text variant="body-3">현재 {orderState.orderItems.length}종류의 상품이 담겨있습니다.</Text>
        <OrderCardList orderItems={orderState.orderItems} />
        <Button variant="secondary" size="full" onClick={() => setIsOpen((prev) => !prev)}>
          쿠폰 적용
        </Button>
      </S.Information>
      <S.ButtonWrap>
        <Button variant="primary" onClick={handleNavigate}>
          결제하기
        </Button>
      </S.ButtonWrap>
      <DeliveryOptions
        isIsolatedAreaSelected={orderState.isIsolatedAreaSelected}
        onToggleIsolatedArea={orderState.toggleIsolatedArea}
      />
      <PaymentPriceList orderItems={orderItems} />
      {orderState.isLoading && <LoadingSpinner />}
      {isOpen && <CouponModal onClose={() => setIsOpen(false)} coupons={coupons} />}
    </S.Container>
  );
};

export default OrderConfirmPage;
