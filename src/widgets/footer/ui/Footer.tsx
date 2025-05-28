/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import * as S from './Footer.styles';

const ButtonCSS = css`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

export default function Footer({ cartItemQuantity }: { cartItemQuantity: number }) {
  return (
    <S.FooterContainer>
      <Button title='주문 확인' css={ButtonCSS} disabled={cartItemQuantity === 0} />
    </S.FooterContainer>
  );
}
