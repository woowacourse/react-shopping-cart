import { useNavigate } from 'react-router-dom';

import * as S from './Logo.style';

import logoImage from '../../assets/logo.svg';
import shopImage from '../../assets/shop.svg';
import { useRefreshCartList } from '../../recoil/cart/cartState';

function Logo() {
  const navigate = useNavigate();
  const refresher = useRefreshCartList();

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={() => {
        refresher();
        navigate('/');
      }}
    >
      <S.LogoContainer>
        <img src={logoImage}></img>
      </S.LogoContainer>

      <img src={shopImage}></img>
    </S.LogoWrapper>
  );
}

export default Logo;
