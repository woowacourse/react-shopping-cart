import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CartIcon from '../../assets/CartIcon';
import useCartProductCount from '../../hooks/useCartProductCount';

const Header = () => {
  const cartProductCount = useCartProductCount();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to='/'>
          <CartIcon width={51} height={44} color='white' />
          <Logo>SHOP</Logo>
        </LogoContainer>
        <CartPageLink to='/cart'>
          장바구니
          <ProductCountAlert>{cartProductCount}</ProductCountAlert>
        </CartPageLink>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1250px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 12px;
    transform: scaleX(-1);
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    & > svg {
      margin-right: 18px;
      transform: scaleX(-1);
    }
  }
`;

const Logo = styled.h1`
  padding: 8px 0 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 0.1em;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    padding: 10px 0 0;
    font-size: 40px;
    line-height: 40px;
  }
`;

const CartPageLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    font-size: 24px;
  }
`;

const ProductCountAlert = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-left: 6px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 24px;

  @media (min-width: ${({ theme }) => theme.breakPoints.small}) {
    width: 26px;
    height: 26px;
    line-height: 28px;
  }
`;

export default Header;
