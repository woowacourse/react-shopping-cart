/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from './Button';

interface NavFooterProps {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export default function NavFooter({ title, onClick, isDisabled }: NavFooterProps) {
  return (
    <FooterContainer>
      <Button onClick={onClick} title={title} css={ButtonCSS} disabled={isDisabled} />
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 64px;
`;

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
