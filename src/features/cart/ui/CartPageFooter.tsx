/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../../shared/ui/Button';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { CartItem } from '../api/types/cart';

interface FooterProps {
  title: string;
  url: string;
  cartItemQuantity: number;
  selectedCartItems: CartItem[];
}

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

export default function Footer({ title, url, cartItemQuantity, selectedCartItems }: FooterProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <FooterContainer>
      <Button
        onClick={handleClick}
        title={title}
        css={ButtonCSS}
        disabled={cartItemQuantity === 0 || selectedCartItems.length === 0}
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
