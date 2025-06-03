import { useLocation } from "react-router-dom";
import * as S from "./OrderCompletePage.styles";
import Button from "../../components/@common/button/Button";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";

const OrderCompletePage = () => {
  const { state } = useLocation();
  const { productTypeCount, totalPrice, totalProductCount } = state;

  return (
    <div css={S.OrderCompleteWrapper}>
      <div css={S.OrderCompleteTitle}>주문 확인</div>
      <div css={S.OrderCompleteDescription}>
        총 {productTypeCount}종류의 상품 {totalProductCount}개를 주문합니다.
      </div>

      <div css={S.OrderCompletePriceContainer}>
        <div css={S.OrderCompleteSubtitle}>총 결제 금액</div>
        <div css={S.OrderCompleteTotalPrice}>
          {totalPrice.toLocaleString()}원
        </div>
      </div>

      <div css={buttonFixedContainer}>
        <Button size="large" color="black" disabled={true} onClick={() => {}}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default OrderCompletePage;
