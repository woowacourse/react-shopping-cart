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
        <Logo>
          <img src="/icons/shopping-cart.svg" alt="쇼핑 카트" />
          <h1>WOOWA SHOP</h1>
        </Logo>

        <NavLinkContainer>
          <a href="/">장바구니</a>
          <a href="/">주문목록</a>
        </NavLinkContainer>
      </NavigationBarInnerContainer>
    </NavigationBarContainer>
  );
};

export default NavigationBar;
