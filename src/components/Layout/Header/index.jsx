import { Link } from 'react-router-dom';

import useCart from 'hooks/useCart';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function Header() {
  const { state: cartState } = useCart();

  return (
    <S.Container>
      <S.LeftMenu>
        <S.MenuButton type="button">전체 카테고리</S.MenuButton>
      </S.LeftMenu>

      <Link to={PAGE_LIST.HOME}>
        <S.Logo />
      </Link>

      <S.RightMenu>
        <Link to={PAGE_LIST.CART_LIST}>
          <S.RightMenuList className="cart" count={cartState.cartItems.length}>
            장바구니
          </S.RightMenuList>
        </Link>
        <S.RightMenuList className="order-list">주문 목록</S.RightMenuList>
      </S.RightMenu>
    </S.Container>
  );
}

export default Header;
