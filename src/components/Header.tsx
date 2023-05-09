import styled from 'styled-components';
import { CartIcon } from '../assets/icons';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>
      <CartButton>장바구니</CartButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;

  padding: 0 10%;

  background-color: #333;

  color: #fff;
`;

const Logo = styled.div`
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

const CartButton = styled.div`
  font-size: 24px;

  cursor: pointer;
`;

export default Header;
