import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {
  Container,
  RedeemCouponButton,
  TotalCost,
  TotalCostLabel,
} from "./OrderSummary.styles";
import { CartItemType } from "../../types/response";
import { getDeliveryCost, getOrderCost } from "../../utils/cost";
import Description from "../../components/Description/Description";
import CartItemList from "../../components/CartItemList/CartItemList";
import CartItem from "../../components/CartItem/CartItem";
import { createPortal } from "react-dom";
import Modal from "../../modal/Modal";
import { useState } from "react";

function OrderSummary() {
  const navigate = useNavigate();

  const location = useLocation();
  const { state: cartItems } = location;

  const getAllQuantity = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const orderCost = getOrderCost(cartItems);
  const totalCost = orderCost + getDeliveryCost(orderCost);

  const [openModal, setOpenModal] = useState(false);
  const modalRoot = document.getElementById("root")!;

  return (
    <>
      <Header icon="backIcon.svg" handleIconClick={() => navigate(-1)} />
      <section css={Container}>
        <Description
          title="주문 확인"
          subtitle={`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        />
        <CartItemList>
          {cartItems.map((cartItem: CartItemType) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </CartItemList>
        <button
          css={RedeemCouponButton}
          type="button"
          onClick={() => setOpenModal(true)}
        >
          쿠폰 적용
        </button>

        <p css={TotalCostLabel}>총 결제 금액</p>
        <p css={TotalCost}>{totalCost.toLocaleString()}원</p>
      </section>
      <SubmitButton enabled={false} label="결제하기" />
      {openModal &&
        createPortal(
          <Modal
            title="쿠폰을 선택해 주세요"
            open={openModal}
            onClose={() => setOpenModal(false)}
            buttonLabel="총 6,000원 할인 쿠폰 사용하기"
            handleModalButtonClick={() => ""}
          >
            <p>aa</p>
          </Modal>,
          modalRoot
        )}
    </>
  );
}
export default OrderSummary;
