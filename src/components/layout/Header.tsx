import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTE_PATH from 'constants/routePath';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <HeaderContainer>
      <FlexLink to={ROUTE_PATH.root}>
        <Logo src={`${process.env.PUBLIC_URL}/assets/cart-icon.svg`} />
        <Title>{children}</Title>
      </FlexLink>
      <FlexLink to={ROUTE_PATH.cart}>
        <CartTitle>장바구니</CartTitle>
        <CartQuantity>2</CartQuantity>
      </FlexLink>
    </HeaderContainer>
  );
};

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  padding: 0 16.66%;
  background-color: #333333;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #ffffff;
`;

const Logo = styled.img`
  width: 50px;
  height: 44px;
`;

const CartTitle = styled.span`
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
`;

const CartQuantity = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #06c09e;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
`;

export default Header;
