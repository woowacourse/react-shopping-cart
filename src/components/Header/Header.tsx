import * as S from './Header.style';

import Logo from '../Logo';
import CartIconWithCount from '../CartIconWithCount/';
import { Container } from '../../styles/style';

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
