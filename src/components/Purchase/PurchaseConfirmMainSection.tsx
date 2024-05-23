import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import {
  orderResultState,
  productTypesCountState,
  totalPurchasePriceState,
} from '@recoil/cartItems/selectors';

const PurchaseConfirmMainSection = () => {
  const { totalQuantity } = useRecoilValue(orderResultState);
  const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);
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
          <span css={orderResult}>{totalPurchasePrice.toLocaleString('ko-KR')}원</span>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmMainSection;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;

const titleWrapper = css`
  display: flex;
  align-items: center;
  height: 35px;
  gap: 24px;
`;

const title = css`
  font-size: 24px;
  font-weight: 700;
`;

const orderInfoContainer = css`
  display: flex;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 18px;
`;

const orderResultContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const orderResultText = css`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #0a0d13;
`;

const orderResult = css`
  font-size: 24px;
  font-weight: 700;
`;
