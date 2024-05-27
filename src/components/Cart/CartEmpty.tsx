import { css } from '@emotion/react';

import { EMPTY_CART } from '@assets/images';

export default function CartEmpty() {
  return (
    <div css={cartEmptyContainer}>
      <img alt="빈 장바구니" src={EMPTY_CART} />
      <span css={cartEmptyText}>장바구니에 담은 상품이 없습니다.</span>
    </div>
  );
}

const cartEmptyContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const cartEmptyText = css`
  font-size: 16px;
  font-weight: 400;
`;
