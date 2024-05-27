import { css } from '@emotion/react';

import Description from '../common/Description';
import Title from '../common/Title';

interface Props {
  cartItemLength: number;
}

export default function CartTitle({ cartItemLength }: Props) {
  return (
    <div css={cartSectionTitleContainer}>
      <Title>장바구니</Title>
      <Description>현재 {cartItemLength}종류의 상품이 담겨있습니다.</Description>
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
