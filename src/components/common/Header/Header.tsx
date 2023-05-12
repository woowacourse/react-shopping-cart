import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartIcon from '../../../assets/cart-icon.svg';
import Logo from '../../../assets/logo.png';
import { cartListItemCountState } from '../../../store/cart';
import * as S from './Header.styles';

const Header = () => {
  const cartListItemCount = useRecoilValue(cartListItemCountState);
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate('/')} />
        <S.CartButton type="button" aria-label="cart">
          {cartListItemCount > 0 && <S.CartItemCount>{cartListItemCount}</S.CartItemCount>}
          <S.CartIcon src={CartIcon} alt="cart icon" />
          <S.HeaderButtonLabel>장바구니</S.HeaderButtonLabel>
        </S.CartButton>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default memo(Header);
