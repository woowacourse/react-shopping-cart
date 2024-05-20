import { css } from '@emotion/react';

import { THEME } from '@/constants/theme';

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

  background-color: ${isDisabled ? THEME.DISABLED : THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
