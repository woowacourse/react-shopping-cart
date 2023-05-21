import ROUTE_PATH from 'Router';
import { ReactComponent as CartIcon } from 'assets/cart-icon.svg';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartProductsCountState } from 'state/CartAtom';
import styled from 'styled-components';

const Header = ({ children }: PropsWithChildren) => {
  const cartProductCount = useRecoilValue(cartProductsCountState);

  return (
    <HeaderContainer>
      <HeaderContentContainer>
        <FlexLink to={ROUTE_PATH.root}>
          <CartIcon width="50px" height="44px" />
          <Title>{children}</Title>
        </FlexLink>
        <FlexLink to={ROUTE_PATH.cart}>
          <CartTitle>장바구니</CartTitle>
          <CartProductCount>{cartProductCount}</CartProductCount>
        </FlexLink>
      </HeaderContentContainer>
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
  width: 100%;
  height: var(--header-height);
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_10};
`;

const HeaderContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  max-width: 1080px;
  margin: 0 auto;
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
