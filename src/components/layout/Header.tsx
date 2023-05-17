import ROUTE_PATH from 'Router';
import { ReactComponent as CartIcon } from 'assets/cart-icon.svg';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartProductCountState } from 'state/CartAtom';
import styled from 'styled-components';

const Header = ({ children }: PropsWithChildren) => {
  const cartProductCount = useRecoilValue(cartProductCountState);

  return (
    <HeaderContainer>
      <FlexLink to={ROUTE_PATH.root}>
        <CartIcon width="50px" height="44px" />
        <Title>{children}</Title>
      </FlexLink>
      <FlexLink to={ROUTE_PATH.cart}>
        <CartTitle>장바구니</CartTitle>
        <CartProductCount>{cartProductCount}</CartProductCount>
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
  background-color: ${({ theme }) => theme.colors.gray_10};
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.gray_0};
`;

const CartTitle = styled.span`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray_0};
  font-size: 24px;
`;

const CartProductCount = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray_0};
  font-size: 16px;
  text-align: center;
  line-height: 24px;
`;

export default Header;
