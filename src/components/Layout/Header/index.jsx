import * as Styled from './styles';

const Header = () => (
  <Styled.Container>
    <div className="left-menu">
      <button className="menu-button" type="button">
        전체 카테고리
      </button>
    </div>

    <div className="logo">로고</div>

    <ul className="right-menu">
      <li className="cart">장바구니</li>
      <li className="order-list">주문목록</li>
    </ul>
  </Styled.Container>
);

export default Header;
