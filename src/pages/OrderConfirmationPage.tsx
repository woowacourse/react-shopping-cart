import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom, couponUsedAtom } from "../recoil/atom/atom";
import { totalCountSelector } from "../recoil/selector/selector";

import LeftArrow from "../assets/LeftArrow.svg?react";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { Button, Title } from "../components/default";
import { CouponModal, OrderItems, PaymentSummary, ShippingInfo } from "../components/orderConfirmationPage";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalCount = useRecoilValue(totalCountSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [couponUsed, setCouponUsed] = useRecoilState(couponUsedAtom);

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems, setCartItems]);

  const description = `총 ${cartItemCheckedIds.length}종류의 상품 ${cartTotalCount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate("/paymentConfirmation");
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setCouponUsed(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setCouponUsed(true);
  };

  return (
    <CartLayout>
      <CouponModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      <Header>
        <LeftArrow
          className={leftArrowBtnCSS}
          onClick={handlePrevClick}
        />
      </Header>

      <Content>
        <Title
          title="장바구니"
          description={description}
        />
        <OrderItems />
        <Button
          variant="secondary"
          size="large"
          onClick={handleOpen}
        >
          쿠폰 적용
        </Button>
        <ShippingInfo />
        <PaymentSummary />
      </Content>

      <Footer
        text="결제하기"
        isActive={true}
        onClick={handleClick}
      />
    </CartLayout>
  );
};

export default OrderConfirmationPage;

const leftArrowBtnCSS = css`
  cursor: pointer;
`;
