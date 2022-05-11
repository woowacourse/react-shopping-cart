import { useState } from 'react';
import { ROUTE } from '../../../route';
import Icon from '../Icon/Icon';
import * as Styled from './Header.style';

export default function Header() {
  const [isBig, setIsBig] = useState(false);
  window.addEventListener('resize', () => {
    if (window.visualViewport.width >= 800) {
      setIsBig(true);
      return;
    }
    setIsBig(false);
  });

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.route}>
          <Styled.Logo>
            <Icon iconName="tent" size={isBig ? '50' : '30'} />
            WOOWA SHOP
          </Styled.Logo>
        </Styled.NavLink>

        <Styled.NavButton>
          <Styled.NavLink to={ROUTE.shoppingCart.route}>장바구니</Styled.NavLink>
          <Styled.NavLink to={ROUTE.orderList.route}>주문목록</Styled.NavLink>
        </Styled.NavButton>
      </Styled.Inner>
    </Styled.Container>
  );
}
