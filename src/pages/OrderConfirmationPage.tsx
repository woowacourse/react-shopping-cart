import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import CartTitle from "../components/CartPage/CartTitle";
import OrderSummary from "../components/CartPage/OrderSummary";
import CartLayout from "../components/layout";

import { checkedIdSetSelector } from "../recoil/cart/checkedState";
import CouponModal from "../components/CouponModal";
import { useModalState } from "lv2-modal-component";
import { css } from "@emotion/css";
import OrderItemList from "../components/OrderConfirmationPage/OrderItemList";
import { cartItemCountSelector } from "../recoil/cart/cartItemState";
import { isRuralAtom, totalCountSelector } from "../recoil/cart/orderSummaryState";
import Button from "../components/default/Button";
import CheckIcon from "../assets/CheckIcon.svg?react";
import { Orders, postOrders } from "../api/orders";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const cartItemCheckedIds = useRecoilValue(checkedIdSetSelector);
  const itemSpecies = useRecoilValue(cartItemCountSelector);
  const totalCount = useRecoilValue(totalCountSelector);

  const handleClick = () => {
    const orders: Orders = { cartItemIds: [...cartItemCheckedIds] };
    postOrders(orders);
    navigate("/paymentConfirmation");
  };

  const { isOpen, closeModal, openModal, confirmModal } = useModalState(false, {
    onOpen: () => {},
    onConfirm: () => {},
  });
  const [isRural, setIsRural] = useRecoilState(isRuralAtom);
  const handleButtonClick = () => setIsRural(!isRural);

  const subTitleString = `총 ${itemSpecies}종류의 상품 ${totalCount}개를 주문합니다.\n최종 결제 금액을 확인해주세요.`;
  return (
    <>
      <CartLayout>
        <CartLayout.Header>SHOP</CartLayout.Header>
        <CartLayout.Content>
          <CartTitle mainText="주문 확인" subText={subTitleString} />
          <OrderItemList />
          <button className={buttonCSS} onClick={openModal}>
            쿠폰 적용
          </button>
          <div className={shippingInfoCSS}>
            <h3>배송 정보</h3>
            <div className={shippingRowCSS}>
              <Button variant={isRural ? "primary" : "secondary"} onClick={handleButtonClick}>
                <CheckIcon fill={isRural ? "#ffffff" : "#0000001A"} />
              </Button>
              <p>제주도 및 도서 산간 지역</p>
            </div>
          </div>
          <OrderSummary />
        </CartLayout.Content>
        <CartLayout.Footer text="결제하기" isActive={cartItemCheckedIds.size > 0} onClick={handleClick} />
      </CartLayout>
      <CouponModal isOpen={isOpen} closeModal={closeModal} confirmModal={confirmModal} />
    </>
  );
};

export default OrderConfirmationPage;

const buttonCSS = css`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  align-items: center;
  width: 100%;
  height: 48px !important;
  box-sizing: border-box;
  border: 1px solid #33333340;
  border-radius: 5px;

  background: transparent;

  font-family: Noto Sans KR;
  font-size: 15px;
  font-weight: 700;
  line-height: 21.72px;
  text-align: center;
`;

const shippingInfoCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
`;

const shippingRowCSS = css`
  display: flex;

  align-items: center;
  column-gap: 8px;

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
