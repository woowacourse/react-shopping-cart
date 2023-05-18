import * as S from './Header.style';

import Logo from '../Logo';
import CartIconWithCount from '../CartIconWithCount/';
import { Container } from '../../styles/style';
import { Suspense } from 'react';

function Header() {
  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <Suspense fallback={<h1>Loading...</h1>}>
            <CartIconWithCount />
          </Suspense>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
