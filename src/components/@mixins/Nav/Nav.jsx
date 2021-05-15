import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllCartItems } from "../../../store/modules/cartSlice";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import * as S from "./Nav.styled";

const Nav = () => {
  const cart = useSelector(selectAllCartItems);
  const cartTotalQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <S.Nav>
      <S.NavWrapper>
        <Link to="/" className="nav-title">
          <CartIcon />
          <h1>WOOWA SHOP</h1>
        </Link>
        <S.NavMenu>
          <li>
            <Link to="/cart" className="cart-link" aria-label="cart-link">
              <span>장바구니</span>
              {cartTotalQuantity > 0 && (
                <span className="cart-amount">{cartTotalQuantity}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/orders-list">
              <span>주문목록</span>
            </Link>
          </li>
        </S.NavMenu>
      </S.NavWrapper>
    </S.Nav>
  );
};

export default Nav;
