import Logo from '../../../assets/png/logo.png';
import CartBadge from '../CartBadge/CartBadge';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Flex from '../Flex';
import * as S from './Header.styles';

const Header = () => {
  return (
    <S.Root>
      <Flex width="80%" justify="space-between" align="center">
        <S.LinkToHome to="/">
          <S.Logo src={Logo} alt="shopping cart logo" />
          <S.Title>SHOP</S.Title>
        </S.LinkToHome>
        <Flex>
          <S.LinkToCart to="/">장바구니</S.LinkToCart>
          <ErrorBoundary>
            <CartBadge />
          </ErrorBoundary>
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default Header;
