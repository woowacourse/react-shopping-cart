import { ROUTE } from '../../../route';
import * as Styled from './Header.style';
import tentLogo from './tent.png';

export default function Header() {
  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.route}>
          <Styled.Logo>
            <img src={tentLogo} alt="logo" width="50px" /> WOOWA SHOP
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
