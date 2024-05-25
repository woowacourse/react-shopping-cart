import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { cartItemCheckedIdsAtom } from "../recoil/atom/atom";
import { totalCountSelector } from "../recoil/selector/selector";
import { useCartCalculator } from "../hooks/useCartCalculator/useCartCalculator";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { formatCurrency } from "../utils/formatCurrency";
import LeftArrow from "../assets/LeftArrow.svg?react";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalCount = useRecoilValue(totalCountSelector);

  const { calculateTotalWithCoupon } = useCartCalculator();

  const text = `총 ${cartItemCheckedIds.length}종류의 상품 ${cartTotalCount}개를 주문했습니다.
  최종 결제 금액을 확인해 주세요.`;

  const handleClick = () => {
    navigate("/");
  };

  return (
    <CartLayout>
      <Header></Header>
      <Content>
        <div className={confirmTextCSS}>
          <div className={headerCSS}>주문 확인</div>
          <div className={textCSS}>{text}</div>
          <div className={totalPriceTitleCSS}> 총 결제 금액</div>
          <div className={totalPriceCSS}> {formatCurrency(calculateTotalWithCoupon())}</div>
        </div>
      </Content>
      <Footer
        text="장바구니 돌아가기"
        isActive={true}
        onClick={handleClick}
      />
    </CartLayout>
  );
};

export default PaymentConfirmationPage;

const leftArrowBtnCSS = css`
  cursor: pointer;
`;

const confirmTextCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
  height: 100%;
`;

const headerCSS = css`
  font: var(--cart-title);
`;

const textCSS = css`
  white-space: pre-line;
  font: var(--cart-label);
  color: var(--grey-400);
  text-align: center;
`;

const totalPriceTitleCSS = css`
  font: var(--cart-subtitle);
  color: var(--grey-400);
`;

const totalPriceCSS = css`
  font: var(--cart-title);
`;
