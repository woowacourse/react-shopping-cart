import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from 'components/common/Button';
import Badge from 'components/common/Badge';
import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import {HeaderWrapper} from 'components/common/Header/style';
import {FlexRowWrapper} from 'components/common/style';

import {PATH} from 'constants/path';
import useCart from 'hooks/useCart';

export default function Header() {
  const navigation = useNavigate();
  const {data: cartList} = useCart();

  const handleLogoClick = () => navigation(PATH.HOME);
  const handleCartButtonClick = () => navigation(PATH.CART);

  return (
    <HeaderWrapper>
      <Button onClick={handleLogoClick}>
        <LogoIcon />
      </Button>
      <FlexRowWrapper justifyContent="flex-end">
        <div style={{height: '14px'}}>
          <Button onClick={handleCartButtonClick}>장바구니</Button>
          <Badge count={cartList.length}></Badge>
        </div>
        <Button>주문목록</Button>
      </FlexRowWrapper>
    </HeaderWrapper>
  );
}
