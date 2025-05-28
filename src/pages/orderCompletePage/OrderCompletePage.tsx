import { css } from "@emotion/react";

const OrderCompletePage = () => {
  return (
    <div css={OrderCompleteWrapper}>
      <div css={OrderCompleteTitle}>주문완료</div>
      <div css={OrderCompleteDescription}>설명입니다</div>

      <div css={OrderCompletePriceContainer}>
        <div css={OrderCompleteSubtitle}>주문금액</div>
        <div css={OrderCompleteTotalPrice}>100,000원</div>
      </div>
    </div>
  );
};

const OrderCompleteWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
`;

const OrderCompleteTitle = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

const OrderCompleteDescription = css`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-body);
`;

const OrderCompleteSubtitle = css`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

const OrderCompletePriceContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
`;

const OrderCompleteTotalPrice = css`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;

export default OrderCompletePage;
