import React from 'react';

import useResponsive from 'hooks/useResponsive';
import { ROUTE } from 'route';
import Icon from 'components/common/Icon/Icon';
import * as Styled from 'components/common/Header/Header.style';

function Header() {
  const currentDevice = useResponsive();

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.path}>
          <Styled.Logo>
            <Icon iconName="tent" size={currentDevice === 'desktop' ? '50' : '30'} stroke="white" />
            BLZZI&apos;S CAMPING
          </Styled.Logo>
        </Styled.NavLink>

        <Styled.NavButton>
          <Styled.NavLink to={ROUTE.shoppingCart.path}>장바구니</Styled.NavLink>
          <Styled.NavLink to={ROUTE.orderList.path}>주문목록</Styled.NavLink>
        </Styled.NavButton>
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Header;
