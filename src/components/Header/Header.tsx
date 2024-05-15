import { useLocation, useNavigate } from 'react-router-dom';
import { LeftArrow, MainLogo } from '../../assets';
import * as S from './Header.style';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === '/';

  return (
    <S.HeaderWrapper>
      {isMainPage ? (
        <S.MainLogo src={MainLogo} alt="메인 로고" />
      ) : (
        <S.GoBackButton onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="뒤로 가기" />
        </S.GoBackButton>
      )}
    </S.HeaderWrapper>
  );
}

export default Header;
