import PlainLink from '../PlainLink/PlainLink';
import Logo from '../Logo/Logo';
import RightMenu from '../RightMenu/RightMenu';
import * as S from './Header.styled';

function Header() {
  return (
    <S.HeaderBox>
      <PlainLink to="/">
        <Logo />
      </PlainLink>
      <RightMenu />
    </S.HeaderBox>
  );
}

export default Header;
