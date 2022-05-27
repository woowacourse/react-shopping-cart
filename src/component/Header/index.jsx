import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'component/common/Button';
import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import * as S from 'component/Header/style';

import {PATH} from 'constant';

export default function Header() {
  const navigation = useNavigate();

  const handleLogoClick = () => navigation(PATH.HOME);

  return (
    <S.HeaderLayout>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <S.HeaderNavBox>
        <S.NavText to={PATH.CART}>장바구니</S.NavText>
        <S.NavText to={PATH.ORDER}>구매목록</S.NavText>
      </S.HeaderNavBox>
    </S.HeaderLayout>
  );
}
