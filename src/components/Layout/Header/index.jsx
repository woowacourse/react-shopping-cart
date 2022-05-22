import { Link } from 'react-router-dom';

import { PAGE_LIST } from 'constants/';
import * as S from './styles';

const Header = () => (
  <S.Container>
    <S.LeftMenu>
      <S.MenuButton type="button">전체 카테고리</S.MenuButton>
    </S.LeftMenu>

    <Link to={PAGE_LIST.HOME}>
      <S.Logo />
    </Link>

    <S.RightMenu>
      <Link to={PAGE_LIST.CART_LIST}>
        <S.RightMenuList className="cart">장바구니</S.RightMenuList>
      </Link>
      <S.RightMenuList className="order-list">주문 목록</S.RightMenuList>
    </S.RightMenu>
  </S.Container>
);

export default Header;
