import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemCheckedIdsAtom, couponsAtom } from "../recoil/atom/atom";
import { totalCountSelector, totalPriceSelector } from "../recoil/selector/selector";
import { formatCurrency } from "../utils/formatCurrency";
import LeftArrow from "../assets/LeftArrow.svg?react";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { Button, Title } from "../components/default";
import OrderItems from "../components/orderConfirmationPage/OrderItems";
import ShippingInfo from "../components/orderConfirmationPage/ShippingInfo";
import PaymentSummary from "../components/orderConfirmationPage/PaymentSummary";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalPrice = useRecoilValue(totalPriceSelector);
  const cartTotalCount = useRecoilValue(totalCountSelector);
  const [coupons, setCoupons] = useRecoilState(couponsAtom);

  const description = `총 ${cartItemCheckedIds.length}종류의 상품 ${cartTotalCount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate("/paymentConfirmation");
  };

  console.log(coupons);

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
          title="장바구니"
          description={description}
        />
        <OrderItems />
        <Button
          variant="secondary"
          size="large"
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
