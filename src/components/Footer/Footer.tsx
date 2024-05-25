import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../constants/Messages';
import * as S from './Footer.styled';

interface FooterProps {
  url: string;
  message: string;
  isDisabled?: boolean;
  onFetchEvent?: () => void;
}

function Footer({
  url,
  message,
  isDisabled = false,
  onFetchEvent,
}: FooterProps) {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent) => {
    if (isDisabled) {
      event.preventDefault();
    } else {
      navigate(url);
      onFetchEvent && onFetchEvent();
    }
  };

  return (
    <S.FooterContainer
      onClick={(e) => handleClick(e)}
      $backgroundColor={isDisabled ? '#BEBEBE' : '#000000'}
    >
      {message}
    </S.FooterContainer>
  );
}

export default Footer;
