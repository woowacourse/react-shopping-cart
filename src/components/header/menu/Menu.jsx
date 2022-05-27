import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledMenu from "@/components/header/menu/Menu.styled";
import Badge from "@/components/badge/Badge";

function Menu() {
  const cartList = useSelector((state) => state.cartListState);
  const count = cartList.length;

  return (
    <StyledMenu>
      <ul>
        <li>
          <Link to="/cart">
            장바구니
            {count > 0 && <Badge count={count} />}
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
