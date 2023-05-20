import { useRecoilValue } from 'recoil';
import { countCartListSelector } from 'src/recoil/cartList';
import * as S from './Header.styles';
import { Link } from 'react-router-dom';
import { PATH } from 'src/utils/constants';

const Header = () => {
  const cartCount = useRecoilValue(countCartListSelector);

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <Link to={PATH.HOME}>
          <S.HeaderWrapper gap={20}>
            <S.Logo>THE CHOONSIK</S.Logo>
            <S.MobileLogo />
          </S.HeaderWrapper>
        </Link>
        <Link to={PATH.SHOPPING_BASKET}>
          <S.HeaderWrapper gap={8}>
            <S.CartTitle>장바구니</S.CartTitle>
            <S.CartCounter>{cartCount}</S.CartCounter>
          </S.HeaderWrapper>
        </Link>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
