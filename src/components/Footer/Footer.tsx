import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../constants/Messages';
import * as S from './Footer.styled';

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
    <S.FooterContainer
      onClick={(e) => handleClick(e)}
      $backgroundColor={isDisabled ? '#BEBEBE' : '#000000'}
    >
      {MESSAGES.confirm}
    </S.FooterContainer>
  );
}

export default Footer;
