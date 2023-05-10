import * as S from './Header.style';
import cartIcon from '../../assets/cart.svg';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

function Header() {
  const navigate = useNavigate();
  const { cartList } = useCart();
  return (
    <S.Navbar>
      <S.Container>
        <S.HeaderWrapper>
          <S.LogoWrapper onClick={() => navigate('/')}>
            <S.CartIcon src={cartIcon} />
            <S.Logo>SHOP</S.Logo>
          </S.LogoWrapper>
          <S.CartWrapper onClick={() => navigate('/cart')}>
            <S.CartTitle>장바구니</S.CartTitle>
            <S.CartCountWrapper>
              <S.CartCount>{cartList.length}</S.CartCount>
            </S.CartCountWrapper>
          </S.CartWrapper>
        </S.HeaderWrapper>
      </S.Container>
    </S.Navbar>
  );
}

export default Header;
