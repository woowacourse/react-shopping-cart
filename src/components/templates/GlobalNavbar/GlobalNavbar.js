import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { NavBar, ShoppingCartIcon } from '../..';
import { ROUTE } from '../../../constants';

const LogoContainer = styled(Link)`
  font-size: 2rem;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 900;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const GlobalNavbar = () => {
  const Logo = (
    <LogoContainer to={ROUTE.HOME}>
      <ShoppingCartIcon scale="0.8" color="white" />
      <span>WOOWA SHOP</span>
    </LogoContainer>
  );

  const Buttons = (
    <>
      <Link to={ROUTE.SHOPPING_CART}>장바구니</Link>
      <Link to={ROUTE.ORDER_LIST}>주문목록</Link>
    </>
  );

  return <NavBar Logo={Logo} Buttons={Buttons} />;
};

export default GlobalNavbar;
