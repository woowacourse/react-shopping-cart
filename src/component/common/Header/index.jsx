import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'component/common/Button';

import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import {HeaderWrapper, HeaderButtonWrapper} from 'component/common/Header/style';

export default function Header() {
  const navigation = useNavigate();

  const handleLogoClick = () => navigation('/');
  const handleCartButtonClick = () => navigation('/cart');

  return (
    <HeaderWrapper>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <HeaderButtonWrapper>
        <Button onClick={handleCartButtonClick}>장바구니</Button>
        <Button>주문목록</Button>
      </HeaderButtonWrapper>
    </HeaderWrapper>
  );
}
