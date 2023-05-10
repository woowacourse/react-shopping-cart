import { useState } from 'react';
import * as S from './Header.style';
import cartIcon from '../../assets/cart.svg';

function Header() {
  const [foo, setFoo] = useState(0);
  return (
    <S.Navbar>
      <S.Container>
        <S.HeaderWrapper>
          <S.LogoWrapper>
            <S.CartIcon src={cartIcon} />
            <S.Logo>SHOP</S.Logo>
          </S.LogoWrapper>
          <S.CartWrapper>
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
