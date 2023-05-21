import Svg from 'components/@common/Svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { countCartListSelector } from 'recoil/cartList';
import * as S from './Header.styles';

const Header = () => {
  const cartCount = useRecoilValue(countCartListSelector);
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/');
  };

  const onNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.HeaderWrapper gap={20}>
          <S.Logo onClick={onLogoClick}>THE CHOONSIK</S.Logo>
          <S.LogoIcon onClick={onLogoClick} />
        </S.HeaderWrapper>
        <S.HeaderWrapper gap={8}>
          <S.CartRouteButton
            title="장바구니 페이지로 이동"
            onClick={onNavigateToCart}
          >
            <Svg type="cart-icon" width={25} height={22} />
          </S.CartRouteButton>
          <S.CartCounter>{cartCount}</S.CartCounter>
        </S.HeaderWrapper>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
