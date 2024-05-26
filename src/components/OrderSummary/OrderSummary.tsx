import styled from "styled-components";
import Title from "./Title";
import OrderItemList from "./OrderItemList";
import { useFetchCoupons } from "../../hooks/useFetchCoupons";
import ApplyCouponButton from "./ApplyCouponButton";
import DeliveryInfo from "./DeliveryInfo";
import PaymentInfo from "./PaymentInfo";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import ApplyCouponModal from "./ApplyCouponModal/ApplyCouponModal";
import { useState } from "react";

export default function OrderSummary() {
  const navigate = useNavigate();

  const { coupons, isLoading, isError } = useFetchCoupons();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onApply = () => {
    console.log(1);
  };

  const handleApplyCouponButtonClick = () => {
    setIsOpen(true);
  };

  const handlePaymentButtonClick = () => {
    navigate(PATH.checkout);
  };

  return (
    <>
      <S.Content>
        <Title />
        <OrderItemList />
        <ApplyCouponButton
          disabled={isLoading}
          onClick={handleApplyCouponButtonClick}
        />
        {!isLoading && !isError && (
          <ApplyCouponModal
            isOpen={isOpen}
            fetchedCoupons={coupons}
            onClose={onClose}
            onApply={onApply}
          />
        )}
        <DeliveryInfo />
        <PaymentInfo />
      </S.Content>
      <Button onClick={handlePaymentButtonClick}>결제하기</Button>
    </>
  );
}

const S = {
  Content: styled.div`
    padding: 36px 24px 100px 24px;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    gap: 32px;
  `,
};
