import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { cartItemCheckedIdsAtom } from "../recoil/atom/atom";
import { totalCountSelector } from "../recoil/selector/selector";
import { useFetchCartItems } from "../hooks/useFetchCartItems/useFetchCartItems";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { CouponButton, OrderItems, PaymentSummary, ShippingInfo } from "../components/orderConfirmationPage";
import { Title } from "../components/default";
import { orderCartItems } from "../api/orderApi";
import LeftArrow from "../assets/LeftArrow.svg?react";
import { useFetchCoupons } from "../hooks/useFetchCoupons/useFetchCoupons";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const checkedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalCount = useRecoilValue(totalCountSelector);

  useFetchCartItems();
  useFetchCoupons();

  const description = `총 ${checkedIds.length}종류의 상품 ${cartTotalCount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleClick = () => {
    orderCartItems(checkedIds);
    navigate("/paymentConfirmation");
  };

  return (
    <CartLayout>
      <Header>
        <LeftArrow
          className={leftArrowBtnCSS}
          onClick={handlePrevClick}
        />
      </Header>

      <Content>
        <Title
          title="주문 확인"
          description={description}
        />
        <OrderItems />
        <CouponButton />
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
