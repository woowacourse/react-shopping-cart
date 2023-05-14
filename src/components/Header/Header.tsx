import * as S from './Header.style';

import { Container } from '../../style/style';
import Logo from '../Logo';
import CartIconWithCount from '../CartIconWithCount/';

function Header() {
  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <CartIconWithCount />
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
