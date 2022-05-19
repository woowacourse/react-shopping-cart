import * as S from './styles';

const Header = () => (
  <S.Container>
    <S.LeftMenu>
      <S.MenuButton type="button">전체 카테고리</S.MenuButton>
    </S.LeftMenu>

    <S.Logo />

    <S.RightMenu>
      <S.RightMenuList className="cart">장바구니</S.RightMenuList>
      <S.RightMenuList className="order-list">주문 목록</S.RightMenuList>
    </S.RightMenu>
  </S.Container>
);

export default Header;
