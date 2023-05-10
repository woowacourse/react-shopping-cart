import Logo from '@Asset/Logo.png';
import UserSummaryShoppingBasket from '@Components/UserSummaryShoppingBasket';

import * as S from './style';
import useShoppingBasket from '@Hooks/useShoppingBasket';

function Header() {
  const { getShoppingItemsAmount } = useShoppingBasket();

  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <UserSummaryShoppingBasket quantity={getShoppingItemsAmount()} />
      </S.Layout>
    </S.Container>
  );
}

export default Header;
