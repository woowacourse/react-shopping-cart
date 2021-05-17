import { FC } from 'react';
import { Link } from 'react-router-dom';
import { APP_BASE_URL } from '../../constants/app';
import Container from '../shared/Container';
import { Logo, NavigationBarContainer, NavigationBarInnerContainer, StyledLink } from './styles';

const NavigationBar: FC = () => (
  <NavigationBarContainer>
    <NavigationBarInnerContainer>
      <Link to="/">
        <Logo>
          <img src={process.env.PUBLIC_URL + '/icons/shopping-cart.svg'} alt="쇼핑 카트" />
          <h1>WOOWA SHOP</h1>
        </Logo>
      </Link>

      <Container direction="row">
        <StyledLink to="/shoppingCart">장바구니</StyledLink>
        <StyledLink to="/orderList">주문목록</StyledLink>
      </Container>
    </NavigationBarInnerContainer>
  </NavigationBarContainer>
);

export default NavigationBar;
