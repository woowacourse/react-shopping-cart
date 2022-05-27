import React from 'react';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import HeaderContainer from 'components/@shared/HeaderContainer/HeaderContainer.component';
import HeaderLink from 'components/@shared/HeaderLink/HeaderLink.component';

import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

function Header() {
  return (
    <HeaderContainer as="header">
      <HeaderLink to="/" type="title">
        <FlexBox gap="15px">
          <ShoppingCart fill="#fff" width={50} height={44} />
          {' WOOWA SHOP'}
        </FlexBox>
      </HeaderLink>
      <FlexBox as="nav" gap="43px">
        <HeaderLink to="/cart" type="nav">
          장바구니
        </HeaderLink>
        <HeaderLink to="/" type="nav">
          주문목록
        </HeaderLink>
      </FlexBox>
    </HeaderContainer>
  );
}

export default React.memo(Header);
