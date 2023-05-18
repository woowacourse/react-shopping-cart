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

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.HeaderWrapper gap={20}>
          <S.Logo onClick={onLogoClick}>THE CHOONSIK</S.Logo>
        </S.HeaderWrapper>
        <S.HeaderWrapper gap={8}>
          <S.CartRouteButton
            title="장바구니 페이지로 이동"
            onClick={() => navigate('/cart')}
          >
            장바구니
          </S.CartRouteButton>
          <S.CartCounter>{cartCount}</S.CartCounter>
        </S.HeaderWrapper>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
