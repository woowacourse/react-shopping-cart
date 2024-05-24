import { useState } from "react";
import styled from "styled-components";

import PaymentTitle from "./PaymentTitle";
import ShippingDetail from "./ShippingDetail";
import ReadOnlyCartItemList from "./ReadOnlyCartItemList";
import CartAmount from "../common/domain/CartAmount";
import CouponModal from "./CouponModal";

import { useCoupons } from "../../hooks/useCoupons";
import PaymentButton from "./PaymentButton";

export default function PaymentContent() {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const toggleCouponModal = () => setIsCouponModalOpen((prev) => !prev);

  const { coupons, toggleSelection, discountAmount, totalPayAmount } = useCoupons();

  return (
    <S.Container>
      <PaymentTitle />
      <ReadOnlyCartItemList />
      <S.CouponApplyButton onClick={toggleCouponModal}>쿠폰 적용</S.CouponApplyButton>
      <ShippingDetail />
      <CartAmount discountAmount={discountAmount} />
      {isCouponModalOpen && (
        <CouponModal
          isOpen={isCouponModalOpen}
          setIsOpen={setIsCouponModalOpen}
          coupons={coupons}
          toggleCouponSelection={toggleSelection}
          discountAmount={discountAmount}
        />
      )}
      <PaymentButton totalPayAmount={totalPayAmount} />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 36px 24px 100px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  CouponApplyButton: styled.button`
    border: 1px solid rgba(51, 51, 51, 0.25);
    border-radius: 5px;

    background-color: white;

    width: 100%;
    height: 40px;
    font-weight: 700;
    font-size: 15px;
    color: rgba(51, 51, 51, 0.75);

    &:hover {
      outline: none;
      border: 1px solid rgba(51, 51, 51, 0.25);
    }
  `,
};
