import { ROUTE } from '../../../route';
import Icon from '../Icon/Icon';
import * as Styled from './Header.style';

function Header() {
  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.Home}>
          <Styled.Logo>
            <Icon iconName="tent" size="30" />
            KKOZZI&apos;S CAMPING
          </Styled.Logo>
        </Styled.NavLink>

        <Styled.NavButton>
          <Styled.NavLink to={ROUTE.ShoppingCart}>장바구니</Styled.NavLink>
          <Styled.NavLink to={ROUTE.OrderList}>주문목록</Styled.NavLink>
        </Styled.NavButton>
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Header;
