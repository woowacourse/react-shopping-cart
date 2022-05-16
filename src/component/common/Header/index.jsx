import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'component/common/Button';
import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import * as S from 'component/common/Header/style';

import {PATH} from 'constant';

export default function Header() {
  const navigation = useNavigate();

  const handleLogoClick = () => navigation(PATH.HOME);
  const handleCartButtonClick = () => navigation(PATH.CART);

  return (
    <S.HeaderLayout>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <S.HeaderButtonBox>
        <Button onClick={handleCartButtonClick}>장바구니</Button>
        <Button>주문목록</Button>
      </S.HeaderButtonBox>
    </S.HeaderLayout>
  );
}
