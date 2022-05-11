import React from 'react';

import Button from 'component/common/Button';

import {ReactComponent as LogoIcon} from 'assets/logoIcon.svg';

import {HeaderWrapper, HeaderButtonWrapper} from 'component/common/Header/style';

export default function Header() {
  return (
    <HeaderWrapper>
      <Button>
        <LogoIcon />
      </Button>
      <HeaderButtonWrapper>
        <Button>장바구니</Button>
        <Button>주문목록</Button>
      </HeaderButtonWrapper>
    </HeaderWrapper>
  );
}
