import cartIcon from '../../assets/cart.svg';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Container } from '../../style/style';
import {
  CartCount, CartCountWrapper, CartIcon,
  CartTitle, CartWrapper, HeaderWrapper,
  Logo, LogoWrapper, Navbar
} from './Header.style';

function Header() {
  const navigate = useNavigate();
  const { cartList } = useCart();
  return (
    <Navbar>
      <Container>
        <HeaderWrapper>
          <LogoWrapper onClick={() => navigate('/')}>
            <CartIcon src={cartIcon} />
            <Logo>SHOP</Logo>
          </LogoWrapper>
          <CartWrapper onClick={() => navigate('/cart')}>
            <CartTitle>장바구니</CartTitle>
            <CartCountWrapper>
              <CartCount>{cartList.length}</CartCount>
            </CartCountWrapper>
          </CartWrapper>
        </HeaderWrapper>
      </Container>
    </Navbar>
  );
}

export default Header;
