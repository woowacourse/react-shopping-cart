import React from 'react';
import { LogoIcon, BackArrowIcon } from '../../asset';
import { useNavigate } from 'react-router-dom';
import * as S from './Header.styled';

interface HeaderProps {
  headerIconType: 'home' | 'back';
}

const handleHeaderIcon = ({ headerIconType }: HeaderProps) => {
  switch (headerIconType) {
    case 'back':
      return { icon: BackArrowIcon, width: '2.1rem', url: -1 };

    default:
      return { icon: LogoIcon, width: '5.6rem', url: '/cart' };
  }
};

function Header({ headerIconType }: HeaderProps) {
  const { icon, width, url } = handleHeaderIcon({ headerIconType });
  const navigate = useNavigate();

  const handleNavigate = (url: string | number) => {
    if (typeof url === 'number') {
      navigate(url);
    } else if (typeof url === 'string') {
      navigate(url);
    }
  };

  return (
    <S.HeaderContainer>
      <S.HeaderIcon
        $width={width}
        src={icon}
        onClick={() => {
          handleNavigate(url);
        }}
      />
    </S.HeaderContainer>
  );
}

export default Header;
