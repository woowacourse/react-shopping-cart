import { css } from '@emotion/react';

interface Props {
  cartItemLength: number;
}

export default function CartTitle({ cartItemLength }: Props) {
  return (
    <div css={cartSectionTitleContainer}>
      <h2 css={cartTitle}>장바구니</h2>
      <p css={description}>현재 {cartItemLength}종류의 상품이 담겨있습니다.</p>
    </div>
  );
}

const cartSectionTitleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding-bottom: 36px;
`;

const cartTitle = css`
  height: 35px;

  font-size: 24px;
  font-weight: 700;
  line-height: 35px;
`;

const description = css`
  height: 15px;

  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
  line-height: 15px;
`;
