import Logo from '@Asset/Logo.png';
import UserSummaryShoppingBasket from '@Components/UserSummaryShoppingBasket';

import * as S from './style';

function Header() {
  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <UserSummaryShoppingBasket quantity={1} />
      </S.Layout>
    </S.Container>
  );
}

export default Header;
