import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  container,
  orderInfoContainer,
  orderResult,
  orderResultContainer,
  orderResultText,
  title,
  titleWrapper,
} from './PurchaseConfirmMainSection.styled';

import { orderResultState, productTypesCountState } from '@recoil/cartItems/selectors';

const PurchaseConfirmMainSection = () => {
  const location = useLocation();

  const { totalQuantity } = useRecoilValue(orderResultState);
  const productTypesCount = useRecoilValue(productTypesCountState);

  return (
    <>
      <div css={container}>
        <div css={titleWrapper}>
          <h2 css={title}>결제 확인</h2>
        </div>

        <div css={orderInfoContainer}>
          총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해주세요.
        </div>

        <div css={orderResultContainer}>
          <span css={orderResultText}>총 결제 금액</span>
          <span css={orderResult}>{location.state.toLocaleString('ko-KR')}원</span>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmMainSection;
