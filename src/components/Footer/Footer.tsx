import React from 'react';
import styled, { css } from 'styled-components';

interface FooterContainerProps {
  $backgroundColor: string;
}

const FooterContainer = styled.footer<FooterContainerProps>`
  ${(props) => css`
    display: flex;
    position: fixed;
    bottom: 0;
    background-color: ${props.$backgroundColor};
    width: 100%;
    height: 6.4rem;

    color: #ffffff;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.6rem;
    text-align: center;

    justify-content: center;
    align-items: center;

    cursor: pointer;
  `}
`;

interface FooterProps {
  value: string;
  isDisabled: boolean;

  onClick: (e: React.MouseEvent) => void;
}

function Footer({ value, isDisabled = false, onClick }: FooterProps) {
  return (
    <>
      {isDisabled ? (
        <FooterContainer $backgroundColor="#BEBEBE">{value}</FooterContainer>
      ) : (
        <FooterContainer
          onClick={onClick} // 이벤트 핸들러 직접 연결
          $backgroundColor="#000000"
        >
          {value}
        </FooterContainer>
      )}
    </>
  );
}

export default Footer;
