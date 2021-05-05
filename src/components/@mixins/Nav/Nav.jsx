import React from "react";
import CartIcon from "../../@shared/CartIcon/CartIcon";
import * as S from "./Nav.styled";

const Nav = () => (
  <S.Nav>
    <div className="nav-wrapper">
      <a href="/" className="nav-title">
        <CartIcon />
        <h1>WOOWA SHOP</h1>
      </a>
      <ul className="nav-menu">
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
      </ul>
    </div>
  </S.Nav>
);

export default Nav;
