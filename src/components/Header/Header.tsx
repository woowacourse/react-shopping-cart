import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { LeftArrow, MainLogo } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './Header.style';

export function MainLogoButton() {
  return (
    <Link to={PATHS.ROOT}>
      <img src={MainLogo} alt="메인 로고" />
    </Link>
  );
}

export function GoBackButton({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <S.GoBackButton {...rest}>
      <img src={LeftArrow} alt="뒤로 가기" />
    </S.GoBackButton>
  );
}

function Header({ children }: React.PropsWithChildren) {
  return <S.HeaderWrapper>{children}</S.HeaderWrapper>;
}

export default Header;
