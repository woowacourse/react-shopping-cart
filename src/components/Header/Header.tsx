import * as S from './Header.style';
import cartIcon from '../../assets/cart.svg';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Container } from '../../style/style';

function Header() {
  const navigate = useNavigate();
  const { cartList } = useCart();
  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <S.LogoWrapper
            type="button"
            aria-label="SHOP 홈페이지로 가기"
            role="button"
            onClick={() => navigate('/')}
          >
            <S.CartIcon src={cartIcon} />
            <S.Logo>SHOP</S.Logo>
          </S.LogoWrapper>
          <S.CartWrapper
            type="button"
            aria-label="장바구니 페이지로 가기"
            role="button"
            onClick={() => navigate('/cart')}
          >
            <S.CartTitle>장바구니</S.CartTitle>
            <S.CartCountWrapper>
              <S.CartCount aria-live="polite">{cartList.length}</S.CartCount>
            </S.CartCountWrapper>
          </S.CartWrapper>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
