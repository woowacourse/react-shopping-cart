/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../shared/constants/routeConstants';
import { useSelectedCartItemsContext } from '../../../shared/context/useSelectedCartItemsContext';
import styled from '@emotion/styled';

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
  const { SelectedCartItemsItems } = useSelectedCartItemsContext();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.CONFIRMATION);
  };

  return (
    <FooterContainer>
      <Button
        onClick={handleClick}
        title="주문 확인"
        css={ButtonCSS}
        disabled={cartItemQuantity === 0 || SelectedCartItemsItems.length === 0}
      />
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
