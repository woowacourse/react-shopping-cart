import React from "react";
import { useSelector } from "react-redux";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import * as S from "./Nav.styled";

const Nav = () => {
  const cart = useSelector((state) => state.cart);
  const cartAmount = Object.values(cart).reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  return (
    <S.Nav>
      <S.NavWrapper>
        <a href="/" className="nav-title">
          <CartIcon />
          <h1>WOOWA SHOP</h1>
        </a>
        <S.NavMenu>
          <li>
            <a href="/" className="cart-link">
              <span>장바구니</span>
              {cartAmount > 0 && (
                <span className="cart-amount">{cartAmount}</span>
              )}
            </a>
          </li>
          <li>
            <a href="/">
              <span>주문목록</span>
            </a>
          </li>
        </S.NavMenu>
      </S.NavWrapper>
    </S.Nav>
  );
};

export default Nav;
