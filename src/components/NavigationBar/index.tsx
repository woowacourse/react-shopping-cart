import { Link } from 'react-router-dom';
import {
  Logo,
  NavigationBarContainer,
  NavigationBarInnerContainer,
  NavLinkContainer,
} from './styles';

const NavigationBar = () => {
  return (
    <NavigationBarContainer>
      <NavigationBarInnerContainer>
        <Link to="/">
          <Logo>
            <img src="/icons/shopping-cart.svg" alt="쇼핑 카트" />
            <h1>WOOWA SHOP</h1>
          </Logo>
        </Link>

        <NavLinkContainer>
          <Link to="/shoppingCart">장바구니</Link>
          <Link to="/orderList">주문목록</Link>
        </NavLinkContainer>
      </NavigationBarInnerContainer>
    </NavigationBarContainer>
  );
};

export default NavigationBar;
