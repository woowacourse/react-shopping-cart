import { useNavigate } from 'react-router-dom';
import cartIcon from '../../assets/cart.svg';
import * as S from './Logo.style';

function Logo() {
  const navigate = useNavigate();

  return (
    <S.LogoWrapper
      type="button"
      aria-label="SHOP 홈페이지로 가기"
      role="button"
      onClick={() => navigate('/')}
    >
      <S.CartIcon src={cartIcon} />
      <S.Logo>SHOP</S.Logo>
    </S.LogoWrapper>
  );
}

export default Logo;
