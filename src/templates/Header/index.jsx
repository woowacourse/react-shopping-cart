import React from 'react';

import FlexWrapper from 'components/FlexWrapper';
import MarginWrapper from 'components/MarginWrapper';

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
          <MarginWrapper marginRight="2.2vw">
            <CartPageButton />
          </MarginWrapper>
          <OrderListButton />
        </FlexWrapper>
      </PageButtonContainerStyled>
    </HeaderStyled>
  );
}

export default Header;
