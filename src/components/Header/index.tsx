import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CartBadge from '@Components/CartBadge';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import Logo from '@Asset/Logo.png';

import * as S from './style';

function Header() {
  const navigate = useNavigate();
  const cartItemsAmount = useRecoilValue(cartItemsAmountState);

  const moveMain = () => navigate('/');

  return (
    <S.Container aria-label="페이지 헤더">
      <S.Layout>
        <S.LogoWrapper onClick={moveMain}>
          <S.LogoImg src={Logo} alt="장바구니 로고" />
          <S.LogoText>SHOP</S.LogoText>
        </S.LogoWrapper>
        <CartBadge cartItemsAmount={cartItemsAmount} />
      </S.Layout>
    </S.Container>
  );
}

export default Header;
