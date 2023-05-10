import { useRecoilValue } from 'recoil';
import Logo from '../../../assets/png/logo.png';
import { cartState } from '../../../recoil/cart';

import Flex from '../Flex';
import * as S from './Header.styles';

const Header = () => {
  const cartItem = useRecoilValue(cartState);

  return (
    <S.Root>
      <Flex width="80%" justify="space-between" align="center">
        <S.LinkToHome to="/">
          <S.Logo src={Logo} alt="shopping cart logo" />
          <S.Title>SHOP</S.Title>
        </S.LinkToHome>
        <Flex>
          <S.LinkToCart to="/">장바구니</S.LinkToCart>
          {cartItem.length && <S.Badge>{cartItem.length}</S.Badge>}
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default Header;
