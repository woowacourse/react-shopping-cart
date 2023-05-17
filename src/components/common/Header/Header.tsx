import styled from 'styled-components';
import useCartService from '../../../hooks/useCartService';
import { CartIcon } from '../../../assets';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cart } = useCartService();

  return (
    <HeaderContainer>
      <Logo to="/">
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>

      <CartButton to="/cart">
        장바구니
        {cart.length > 0 && (
          <CartTotalQuantity>{cart.length}</CartTotalQuantity>
        )}
      </CartButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;

  padding: 0 10%;

  background-color: #333;

  color: #fff;

  z-index: 1;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 15px;

  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  padding-top: 8px;
`;

const CartButton = styled(Link)`
  display: flex;
  column-gap: 6px;
  font-size: 24px;

  cursor: pointer;
`;

const CartTotalQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  border-radius: 50%;
  background: #04c09e;

  font-size: 16px;
`;

export default Header;
