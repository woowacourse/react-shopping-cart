import { useLocation } from 'react-router-dom';
import * as S from './OrderCompletePage.styles';

const OrderCompletePage = () => {
  const { state } = useLocation();
  const { productTypeCount, totalPrice, totalProductCount } = state;

  return (
    <div css={S.OrderCompleteWrapper}>
      <div css={S.OrderCompleteTitle}>주문완료</div>
      <div css={S.OrderCompleteDescription}>
        총 {productTypeCount}종류의 상품 {totalProductCount}개를 주문합니다.
      </div>

      <div css={S.OrderCompletePriceContainer}>
        <div css={S.OrderCompleteSubtitle}>주문금액</div>
        <div css={S.OrderCompleteTotalPrice}>
          {totalPrice.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePage;
