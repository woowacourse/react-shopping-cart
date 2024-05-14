import { MainLogo } from '../../assets';
import * as S from './Header.style';

function Header() {
  return (
    <S.HeaderWrapper>
      <img src={MainLogo}></img>
    </S.HeaderWrapper>
  );
}

export default Header;
