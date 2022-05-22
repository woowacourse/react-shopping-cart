import React from 'react';

import useWindowsSize from 'hooks/useWindowSize';

import { ROUTE } from 'route';

import Icon from 'components/common/Icon/Icon';
import * as Styled from 'components/common/Header/Header.style';

import { deviceSizeStandard } from 'styles/Theme';

function Header() {
  const windowSize = useWindowsSize();

  const IconSizeBreakPoint = deviceSizeStandard.desktop;

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.path}>
          <Styled.Logo>
            <Icon
              iconName="Tent"
              size={windowSize >= IconSizeBreakPoint ? '50' : '30'}
              stroke="white"
            />
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
