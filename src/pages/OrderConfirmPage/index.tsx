import * as S from "./OrderConfirmPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import LoadingSpinner from "../../components/icons/LoadingSpinner";
import OrderCardList from "./components/OrderCardList";
import PaymentPriceList from "./components/PaymentPriceList";
import CouponModal from "./components/CouponModal";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useCoupons } from "./hooks/useCoupons";
import DeliveryOptions from "./components/DeliveryOptions";
import { useOrderState } from "./hooks/useOrderState";

const OrderConfirmPage = () => {
  const { state: orderItems } = useLocation();
  const { isLoading, coupons } = useCoupons();
  const orderState = useOrderState();
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/payment-success");
  return (
    <S.Container>
      <Text variant="title-1">주문 확인</Text>
      <S.Information>
        <Text variant="body-3">현재 {orderItems.length}종류의 상품이 담겨있습니다.</Text>
        <OrderCardList orderItems={orderItems} />
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
      {isLoading && <LoadingSpinner />}
      {isOpen && <CouponModal onClose={handleClose} coupons={coupons} />}
    </S.Container>
  );
};

export default OrderConfirmPage;
