import { useRecoilValue } from 'recoil';
import Logo from '../../../assets/png/logo.png';
import { cartQuantityBadgeState } from '../../../recoil/cart';

import Flex from '../Flex';
import * as S from './Header.styles';

const Header = () => {
  const cartQuantity = useRecoilValue(cartQuantityBadgeState);

  return (
    <S.Root>
      <Flex width="80%" justify="space-between" align="center">
        <S.LinkToHome to="/">
          <S.Logo src={Logo} alt="shopping cart logo" />
          <S.Title>SHOP</S.Title>
        </S.LinkToHome>
        <Flex>
          <S.LinkToCart to="/">장바구니</S.LinkToCart>
          {cartQuantity && <S.Badge>{cartQuantity}</S.Badge>}
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default Header;
