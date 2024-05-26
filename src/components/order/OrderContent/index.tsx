import { useRecoilValue } from "recoil";
import { selectedCartItemsState } from "@/stores/cartItemSelections";

import useModal from "@/hooks/modal/useModal";

import OrderDescription from "../OrderDescription";
import OrderPrice from "../OrderPrice";
import OrderItemCard from "../OrderItemCard";
import CouponApplyButton from "@/components/button/CouponApplyButton";
import CouponModal from "@/components/coupon/CouponModal";
import ShippingAreaSelection from "../ShippingAreaSelection";

import * as S from "./styled";

const OrderContent = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const selectedCartItems = useRecoilValue(selectedCartItemsState);

  return (
    <S.Container>
      <OrderDescription />
      {selectedCartItems.map((cartItem) => (
        <OrderItemCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <CouponApplyButton onButtonClick={openModal} />
      <CouponModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <ShippingAreaSelection />
      <OrderPrice />
    </S.Container>
  );
};

export default OrderContent;
