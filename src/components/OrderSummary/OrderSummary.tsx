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
import { useEffect, useState } from "react";
import { orders } from "../../api/order";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCartItemIdsState } from "../../recoil/cart/selectedCartItemIds";
import { selectedCartItemsCountState } from "../../recoil/selectedCartItemsCount";
import {
  is도서산간지역State,
  totalOrderAmountState,
} from "../../recoil/cartAmount";
import { couponsState } from "../../recoil/coupon/coupons";

export default function OrderSummary() {
  const navigate = useNavigate();

  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(
    selectedCartItemIdsState
  );
  const setGlobalCouponsState = useSetRecoilState(couponsState);
  const setIs도서산간지역State = useSetRecoilState(is도서산간지역State);

  const selectedUniqueCartItemsCount = useRecoilValue(
    selectedCartItemIdsState
  ).length;
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountState);
  const totalOrderAmount = useRecoilValue(totalOrderAmountState);

  const { coupons, isLoading } = useFetchCoupons();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleApplyCouponButtonClick = () => {
    setIsOpen(true);
  };

  const handlePaymentButtonClick = async () => {
    await orders(selectedCartItemIds);
    navigate(PATH.checkout, {
      state: {
        selectedUniqueCartItemsCount,
        selectedCartItemsCount,
        totalOrderAmount,
      },
    });
    setSelectedCartItemIds([]);
  };

  useEffect(() => {
    return () => {
      setGlobalCouponsState([]);
      setIs도서산간지역State(false);
    };
  }, []);

  return (
    <>
      <S.Content>
        <Title />
        <OrderItemList />
        <ApplyCouponButton
          disabled={isLoading}
          onClick={handleApplyCouponButtonClick}
        />
        {isOpen && (
          <ApplyCouponModal
            isOpen={isOpen}
            fetchedCoupons={coupons}
            onClose={onClose}
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
