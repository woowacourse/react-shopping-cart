import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  url: string;
  isDisabled: boolean;
}

function Footer({ value, url, isDisabled = false }: FooterProps) {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent) => {
    if (isDisabled) {
      event.preventDefault();
    } else {
      navigate(url);
    }
  };

  return (
    <FooterContainer
      onClick={(e) => handleClick(e)}
      $backgroundColor={isDisabled ? '#BEBEBE' : '#000000'}
    >
      {value}
    </FooterContainer>
  );
}

export default Footer;
