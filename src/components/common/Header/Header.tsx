import Logo from '../../../assets/png/logo.png';
import { PAGE_ROUTES } from '../../../constants/routes';
import AsyncBoundary from '../../AsyncBoundary/AsyncBoundary';
import CartBadge from '../CartBadge/CartBadge';
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
        <S.LinkToCart to={PAGE_ROUTES.CART}>
          <Flex align="center">
            <div>장바구니</div>
            <AsyncBoundary>
              <CartBadge />
            </AsyncBoundary>
          </Flex>
        </S.LinkToCart>
      </Flex>
    </S.Root>
  );
};

export default Header;
