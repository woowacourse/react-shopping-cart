import React from "react";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import * as S from "./Nav.styled";

const Nav = () => (
  <S.Nav>
    <S.NavWrapper>
      <a href="/" className="nav-title">
        <CartIcon />
        <h1>WOOWA SHOP</h1>
      </a>
      <S.NavMenu>
        <li>
          <a href="/">
            <span>장바구니</span>
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

export default Nav;
