import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LeftArrow, MainLogo } from '../../assets';
import * as S from './Header.style';
import { PATHS } from '../../constants/PATHS';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === PATHS.ROOT || location.pathname === PATHS.ERROR;

  return (
    <S.HeaderWrapper>
      {isMainPage ? (
        <Link to={PATHS.ROOT}>
          <S.MainLogo src={MainLogo} alt="메인 로고" />
        </Link>
      ) : (
        <S.GoBackButton onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="뒤로 가기" />
        </S.GoBackButton>
      )}
    </S.HeaderWrapper>
  );
}

export default Header;
