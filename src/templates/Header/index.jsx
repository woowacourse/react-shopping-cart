import React from 'react';

import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';
import MarginWrapper from 'components/MarginWrapper';
import WhiteButton from 'components/WhiteButton';

import HomeButton from 'containers/HomeButton';
import OrderListButton from 'containers/OrderListButton';

import { HeaderStyled, PageButtonContainerStyled } from './style';

function Header() {
  return (
    <HeaderStyled>
      <PageButtonContainerStyled>
        <HomeButton />
        <FlexAlignCenter>
          <MarginWrapper marginRight="2.2vw">
            <WhiteButton fontSize="1.5rem">장바구니</WhiteButton>
          </MarginWrapper>
          <OrderListButton />
        </FlexAlignCenter>
      </PageButtonContainerStyled>
    </HeaderStyled>
  );
}

export default Header;
