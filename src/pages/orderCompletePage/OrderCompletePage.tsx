import { useLocation } from "react-router-dom";
import * as S from "./OrderCompletePage.styles";
import Button from "../../components/@common/button/Button";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import useEasyNavigate from "../../hooks/useEasyNavigate";

const OrderCompletePage = () => {
  const { state } = useLocation();
  const { productTypeCount, totalPrice, totalProductCount } = state;
  const { goHome } = useEasyNavigate();
  return (
    <div css={S.OrderCompleteWrapper}>
      <div css={S.OrderCompleteContainer}>
        <div css={S.OrderCompleteTitle}>결제 확인</div>
        <div css={S.OrderCompleteDescription}>
          <p>
            총 {productTypeCount}종류의 상품 {totalProductCount}개를 주문합니다.
          </p>
          <p>최종 결제 금액을 확인 해 주세요</p>
        </div>

        <div css={S.OrderCompletePriceContainer}>
          <div css={S.OrderCompleteSubtitle}>총 결제 금액</div>
          <div css={S.OrderCompleteTotalPrice}>
            {totalPrice.toLocaleString()}원
          </div>
        </div>
      </div>

      <div css={buttonFixedContainer}>
        <Button size="large" color="black" onClick={goHome}>
          장바구니로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default OrderCompletePage;
