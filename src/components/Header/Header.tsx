import { useState } from 'react';
import * as S from './Header.style';
import cartIcon from '../../assets/cart.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [foo, setFoo] = useState(0);
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
              <S.CartCount>{foo}</S.CartCount>
            </S.CartCountWrapper>
          </S.CartWrapper>
        </S.HeaderWrapper>
      </S.Container>
    </S.Navbar>
  );
}

export default Header;
