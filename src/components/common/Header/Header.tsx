import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import CartIcon from '../../../assets/cart-icon.svg';
import Logo from '../../../assets/logo.png';
import { PATH } from '../../../constants/path';
import { cartListItemCountState } from '../../../store/cart';
import * as S from './Header.styles';

const Header = () => {
  const cartListItemCount = useRecoilValueLoadable(cartListItemCountState);
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.Logo src={Logo} alt="logo" onClick={() => navigate(PATH.ROOT)} />
        <S.CartButton
          type="button"
          aria-labelledby="cart-button"
          variant="textButton"
          onClick={() => navigate(PATH.CARTS)}
        >
          {cartListItemCount.contents > 0 && (
            <S.CartItemCount>{cartListItemCount.contents}</S.CartItemCount>
          )}
          <S.CartIcon src={CartIcon} alt="cart icon" />
          <S.HeaderButtonLabel id="cart-button">장바구니</S.HeaderButtonLabel>
        </S.CartButton>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
