import { css } from '@emotion/react';

interface Props {
  cartItemLength: number;
}

export default function CartHeaderSection({ cartItemLength }: Props) {
  return (
    <section css={cartHeaderSection}>
      <div css={cartTitleWrapper}>
        <h2 css={cartTitle}>장바구니</h2>
      </div>
      <div css={descriptionWrapper}>
        <span css={description}>현재 {cartItemLength}종류의 상품이 담겨있습니다.</span>
      </div>
    </section>
  );
}

const cartHeaderSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding: 36px 0;
`;

const cartTitleWrapper = css`
  display: flex;
  align-items: center;

  height: 35px;
`;

const cartTitle = css`
  font-size: 24px;
  font-weight: 700;
`;

const descriptionWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15px;
`;

const description = css`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
