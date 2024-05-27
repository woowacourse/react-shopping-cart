import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { formatCurrency } from "../utils/formatCurrency";
import LeftArrow from "../assets/LeftArrow.svg?react";
import CartLayout from "../components/layout";
import { checkedIdSetSelector } from "../recoil/cart/checkedState";
import { totalCountSelector, totalPriceSelector } from "../recoil/cart/orderSummaryState";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const cartItemCheckedIds = useRecoilValue(checkedIdSetSelector);
  const cartTotalPrice = useRecoilValue(totalPriceSelector);
  const cartTotalCount = useRecoilValue(totalCountSelector);

  const text = `총 ${cartItemCheckedIds.size}종류의 상품 ${cartTotalCount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <CartLayout>
      <CartLayout.Header>
        <LeftArrow className={leftArrowBtnCSS} onClick={handleClick} />
      </CartLayout.Header>
      <CartLayout.Content>
        <div className={confirmTextCSS}>
          <div className={headerCSS}>결제 확인</div>
          <div className={textCSS}>{text}</div>
          <div className={totalPriceTitleCSS}> 총 결제 금액</div>
          <div className={totalPriceCSS}> {formatCurrency(cartTotalPrice)}</div>
        </div>
      </CartLayout.Content>
      <CartLayout.Footer text="결제하기" isActive={false} />
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
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
`;

const textCSS = css`
  white-space: pre-line;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
`;

const totalPriceTitleCSS = css`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

const totalPriceCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
`;
