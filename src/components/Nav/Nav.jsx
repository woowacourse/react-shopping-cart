import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { ROUTE } from "../../constants/constant";
import { useCart } from "../../hooks/useCart";
import { useOrder } from "../../hooks/useOrder";
import CartIcon from "../@shared/CartIcon/CartIcon";
import * as S from "./Nav.styled";

const Nav = () => {
  const { cartAmount, getCarts } = useCart();
  const { orders } = useOrder();
  const ordersLength = Object.values(orders).length;

  useEffect(() => {
    getCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersLength]);

  return (
    <S.Nav>
      <S.NavWrapper>
        <Link to={ROUTE.HOME} className="nav-title">
          <CartIcon />
          <h1>WOOWA SHOP</h1>
        </Link>
        <S.NavMenu>
          <li>
            <Link to={ROUTE.CART} className="cart-link" aria-label="cart-link">
              <span>장바구니</span>
              {cartAmount > 0 && (
                <span className="cart-amount">{cartAmount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to={ROUTE.ORDERS_LIST}>
              <span>주문목록</span>
            </Link>
          </li>
        </S.NavMenu>
      </S.NavWrapper>
    </S.Nav>
  );
};

export default Nav;
