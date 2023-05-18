import Logo from '@Asset/Logo.png';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import UserSummaryShoppingCart from '@Components/UserSummaryShoppingCart';

import shoppingItemsAmountState from '@Selector/shoppingItemsAmountState';

import * as S from './style';

function Header() {
  const shoppingItemsAmount = useRecoilValue(shoppingItemsAmountState);

  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <Link to="product-list" style={{ display: 'inherit' }}>
          <S.LogoWrapper>
            <S.LogoImg src={Logo} alt="장바구니 로고" style={{ userSelect: 'none' }} />
            <S.LogoText style={{ userSelect: 'none' }}>SHOP</S.LogoText>
          </S.LogoWrapper>
        </Link>
        <Link to="product-select-list" style={{ display: 'inherit' }}>
          <UserSummaryShoppingCart quantity={shoppingItemsAmount} />
        </Link>
      </S.Layout>
    </S.Container>
  );
}

export default Header;
