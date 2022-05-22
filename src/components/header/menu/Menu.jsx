import { Link } from "react-router-dom";
import StyledMenu from "@/components/header/menu/Menu.styled";
import Badge from "@/components/badge/Badge";

function Menu() {
  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/cart">
            장바구니
            <Badge />
          </Link>
        </li>
        <li>
          <Link to="/not-found">주문목록</Link>
        </li>
      </ul>
    </StyledMenu>
  );
}

export default Menu;
