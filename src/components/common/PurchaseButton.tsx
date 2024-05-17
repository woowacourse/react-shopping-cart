import { css } from '@emotion/react';

export default function PurchaseButton() {
  return (
    <button css={purchaseButton(true)} disabled={true}>
      결제하기
    </button>
  );
}

const purchaseButton = (isDisabled: boolean) => css`
  width: 100%;
  height: 64px;

  background-color: ${isDisabled ? '#BEBEBE' : '#000'};

  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
