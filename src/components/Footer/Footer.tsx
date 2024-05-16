import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { MESSAGES } from '../../constants/Messages';

interface FooterContainerProps {
  $backgroundColor: string;
}

const FooterContainer = styled.div<FooterContainerProps>`
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
  `}
`;

interface FooterProps {
  url: string;
  isDisabled: boolean;
}

function Footer({ url, isDisabled = false }: FooterProps) {
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
      {MESSAGES.confirm}
    </FooterContainer>
  );
}

export default Footer;
