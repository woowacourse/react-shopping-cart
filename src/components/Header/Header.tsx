import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CartIcon from '../../assets/icons/CartIcon';
import cartState from '../../globalState/atoms/cartState';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const numberOfCartItem = useRecoilValue(cartState).length;

  const onLogoClick = () => {
    navigate('/');
  };

  const onCartButtonClick = () => {
    navigate('/cart');
  };

  return (
    <HeaderContainer>
      <Logo onClick={onLogoClick}>
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>
      <CartButton onClick={onCartButtonClick}>
        장바구니
        <CartTotalQuantity>{numberOfCartItem}</CartTotalQuantity>
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
