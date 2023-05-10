import { useRecoilValue } from 'recoil';
import { countCartListSelector } from 'src/recoil/cartList';
import Svg from '../@common/Svg';
import * as S from './Header.styles';

const Header = () => {
  const cartCount = useRecoilValue(countCartListSelector);

  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.HeaderWrapper gap={20}>
          <Svg type="header-cart" width={50} height={44} />
          <S.Logo>THE 춘식</S.Logo>
        </S.HeaderWrapper>
        <S.HeaderWrapper gap={8}>
          <S.CartTitle>장바구니</S.CartTitle>
          <S.CartCounter>{cartCount}</S.CartCounter>
        </S.HeaderWrapper>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
