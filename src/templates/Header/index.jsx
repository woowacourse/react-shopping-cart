import React from 'react';

import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';
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
        <FlexAlignCenter>
          <MarginRightWrapper marginRight="2.2vw">
            <CartPageButton />
          </MarginRightWrapper>
          <OrderListButton />
        </FlexAlignCenter>
      </PageButtonContainerStyled>
    </HeaderStyled>
  );
}

export default Header;
