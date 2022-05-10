import { ROUTE } from '../../../route';
import Icon from '../Icon';
import * as Styled from './Header.style';

export default function Header() {
  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.route}>
          <Styled.Logo>
            <Icon iconName="tent" /> WOOWA SHOP
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
