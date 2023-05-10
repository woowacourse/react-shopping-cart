import Svg from '../@common/Svg';
import * as S from './Header.styles';

const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContentContainer>
        <S.HeaderWrapper gap={20}>
          <Svg type="header-cart" width={50} height={44} />
          <S.Logo>THE 춘식</S.Logo>
        </S.HeaderWrapper>
        <S.HeaderWrapper gap={8}>
          <S.CartTitle>장바구니</S.CartTitle>
          <S.CartCounter>2</S.CartCounter>
        </S.HeaderWrapper>
      </S.HeaderContentContainer>
    </S.HeaderContainer>
  );
};

export default Header;
