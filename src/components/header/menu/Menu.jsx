import StyledMenu from "@/components/header/menu/Menu.styled";

function Menu() {
  return (
    <StyledMenu>
      <ul>
        <li>
          <a href="/">장바구니</a>
        </li>
        <li>
          <a href="/">주문목록</a>
        </li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;
