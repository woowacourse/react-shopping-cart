import Logo from '@Asset/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import UserSummaryShoppingCart from '@Components/UserSummaryShoppingCart';

import shoppingCartAmountState from '@Selector/shoppingCartAmountState';

import * as S from './style';

function Header() {
  const navigate = useNavigate();
  const shoppingCartAmount = useRecoilValue(shoppingCartAmountState);

  const moveMain = () => navigate('/product-list');

  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper onClick={moveMain}>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <UserSummaryShoppingCart shoppingCartAmount={shoppingCartAmount} />
      </S.Layout>
    </S.Container>
  );
}

export default Header;
