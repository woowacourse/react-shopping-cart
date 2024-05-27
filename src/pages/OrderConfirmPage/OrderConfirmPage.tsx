import { Suspense, useEffect } from "react";

import { useRecoilValue, useResetRecoilState } from "recoil";

import {
  selectedCartItemLengthSelector,
  selectedCartItemTotalQuantitySelector,
} from "@/recoil/selectedCardItems";
import { selectedCouponState } from "@/recoil/coupon";

import useModal from "@/hooks/useModal";
import useRequestOrder from "@/hooks/useRequestOrder";

import Header from "@/components/_common/Header/Header";
import Caption from "@/components/_common/Caption/Caption";
import BackButton from "@/components/_common/BackButton/BackButton";
import TitleSet from "@/components/_common/TitleSet/TitleSet";
import Button from "@/components/_common/Button/Button";

import ShippingInfoCheckBox from "./components/ShippingInfoCheckBox";
import CartItemCouponModal from "../../components/CartItemCouponModal/CartItemCouponModal";
import BottomFixedButton from "@/components/BottomFixedButton/BottomFixedButton";
import PriceSection from "./components/PriceSection";
import SelectedCartItemList from "./components/SelectedCartItemList";

import Styled from "./OrderConfirmPage.styles";

const OrderConfirmPage = () => {
  const resetCoupons = useResetRecoilState(selectedCouponState);
  const selectedCartItemLength = useRecoilValue(selectedCartItemLengthSelector);
  const selectedCartItemTotalQuantity = useRecoilValue(
    selectedCartItemTotalQuantitySelector
  );

  const { handleRequestOrders } = useRequestOrder();

  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    resetCoupons();
  }, [resetCoupons]);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <CartItemCouponModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      </Suspense>

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
