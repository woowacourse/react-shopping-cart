import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue, useResetRecoilState } from "recoil";

import { selectedCouponState } from "@/recoil/coupon";
import {
  selectedCartItemIdsSelector,
  selectedCartItemLengthSelector,
  selectedCartItemTotalQuantitySelector,
} from "@/recoil/selectedCardItems";

import useModal from "@/hooks/useModal";
import { requestOrders } from "@/apis";

import Header from "@/components/_common/Header/Header";
import Caption from "@/components/_common/Caption/Caption";
import BackButton from "@/components/_common/BackButton/BackButton";
import TitleSet from "@/components/_common/TitleSet/TitleSet";
import Button from "@/components/_common/Button/Button";

import ShippingInfoCheckBox from "./components/ShippingInfoCheckBox";
import CartItemCouponModal from "@/components/CartItemCouponModal/CartItemCouponModal";
import BottomFixedButton from "@/components/BottomFixedButton/BottomFixedButton";
import PriceSection from "./components/PriceSection";
import SelectedCartItemList from "./components/SelectedCartItemList";

import Styled from "./OrderConfirmPage.styles";
import CLIENT_PATH from "@/constants/path";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const resetCoupons = useResetRecoilState(selectedCouponState);

  const selectedCartItemLength = useRecoilValue(selectedCartItemLengthSelector);
  const selectedCartItemTotalQuantity = useRecoilValue(
    selectedCartItemTotalQuantitySelector
  );
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsSelector);

  const { isModalOpen, openModal, closeModal } = useModal();

  const routerToPaymentConfirmPage = () => navigate(CLIENT_PATH.paymentConfirm);

  const handleRequestOrders = async () => {
    try {
      await requestOrders(selectedCartItemIds);
      routerToPaymentConfirmPage();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    resetCoupons();
  }, [resetCoupons]);

  return (
    <>
      <CartItemCouponModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <Header>
        <BackButton />
      </Header>

      <Styled.ConfirmPageLayout>
        <TitleSet
          title="주문 확인"
          subTitle={`총 ${selectedCartItemLength}종류의 상품 ${selectedCartItemTotalQuantity}개를 주문합니다.`}
        />
        <Caption text="최종 결제 금액을 확인해 주세요." />
        <SelectedCartItemList />
        <Button radiusVariant="rounded" onClick={openModal}>
          쿠폰 적용
        </Button>
        <ShippingInfoCheckBox />
        <PriceSection />
      </Styled.ConfirmPageLayout>

      <BottomFixedButton onClick={handleRequestOrders} buttonText="결제하기" />
    </>
  );
};

export default OrderConfirmPage;
