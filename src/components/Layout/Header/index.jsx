import * as Styled from './styles';

const Header = () => (
  <Styled.Container>
    <Styled.LeftMenu>
      <Styled.MenuButton type="button">전체 카테고리</Styled.MenuButton>
    </Styled.LeftMenu>

    <Styled.Logo />

    <Styled.RightMenu>
      <Styled.RightMenuList className="cart">장바구니</Styled.RightMenuList>
      <Styled.RightMenuList className="order-list">주문 목록</Styled.RightMenuList>
    </Styled.RightMenu>
  </Styled.Container>
);

export default Header;
