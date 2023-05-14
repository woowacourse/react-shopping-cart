import * as S from './Header.style';
import { useNavigate } from 'react-router-dom';

import useCart from '../../hooks/useCart';
import { Container } from '../../style/style';
import Logo from '../Logo';

function Header() {
  const navigate = useNavigate();
  const { cartList } = useCart();
  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
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
