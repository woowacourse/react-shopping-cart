import { useState } from "react";
import styled from "styled-components";

import PaymentTitle from "./PaymentTitle";
import ShippingDetail from "./ShippingDetail";
import ReadOnlyCartItemList from "./ReadOnlyCartItemList";
import CartAmount from "../common/domain/CartAmount";
import CouponModal from "./CouponModal";

import { useCoupons } from "../../hooks/useCoupons";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/routePath";
import { useSelectedCartItemCounts } from "../../hooks/useSelectedCartItemCounts";
import { useSetRecoilState } from "recoil";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

export default function PaymentContent() {
  const navigate = useNavigate();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const toggleCouponModal = () => setIsCouponModalOpen((prev) => !prev);

  const setSelectedCouponIds = useSetRecoilState(selectedCartItemIdsState);
  const { selectedCartItemsCount, selectedUniqueCartItemsCount } = useSelectedCartItemCounts();

  const { coupons, toggleSelection, discountAmount, totalPayAmount } = useCoupons();

  const onPayButtonClick = () => {
    // 결제 로직을 수행했다고 가정
    setSelectedCouponIds([]);
    navigate(ROUTE_PATH.checkout, {
      state: {
        boughtItemsCount: selectedCartItemsCount,
        uniqueBoughtItemsCount: selectedUniqueCartItemsCount,
        totalPayAmount,
      },
    });
  };

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
      <S.PayButton onClick={onPayButtonClick}>결제하기</S.PayButton>
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

  PayButton: styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
