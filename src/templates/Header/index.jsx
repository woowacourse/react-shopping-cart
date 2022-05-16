import React from 'react';

import FlexWrapper from 'components/FlexWrapper';
import MarginRightWrapper from 'components/MarginRightWrapper';

import HomeButton from 'containers/HomeButton';
import CartPageButton from 'containers/CartPageButton';
import OrderListButton from 'containers/OrderListButton';

import { HeaderStyled, PageButtonContainerStyled } from './style';

function Header() {
  return (
    <HeaderStyled>
      <PageButtonContainerStyled>
        <HomeButton />
        <FlexWrapper alignItmes="center">
          <MarginRightWrapper marginRight="2.2vw">
            <CartPageButton />
          </MarginRightWrapper>
          <OrderListButton />
        </FlexWrapper>
      </PageButtonContainerStyled>
    </HeaderStyled>
  );
}

export default Header;
