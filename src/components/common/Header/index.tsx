import Logo from '../../../assets/png/logo.png';
import { PAGE_ROUTES } from '../../../constants/routes';
import CartBadge from '../CartBadge';
import { ErrorBoundary } from 'react-error-boundary';
import Flex from '../Flex';
import * as S from './Header.styles';

const Header = () => {
  return (
    <S.Root>
      <Flex width="80%" justify="space-between" align="center">
        <S.LinkToHome to={PAGE_ROUTES.HOME}>
          <S.Logo src={Logo} alt="shopping cart logo" />
          <S.Title>SHOP</S.Title>
        </S.LinkToHome>
        <Flex>
          <S.LinkToCart to={PAGE_ROUTES.CART}>장바구니</S.LinkToCart>
          <ErrorBoundary fallback={<p />}>
            <CartBadge />
          </ErrorBoundary>
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default Header;
