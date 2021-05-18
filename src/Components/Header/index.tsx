import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Icon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, Inner, Flex, H1, NavigationItem } from "./style";

const Header: FC = () => (
  <Container>
    <Inner>
      <Link to="/">
        <Flex>
          <Icon.Cart size={SIZE.ICON.CART.LG} color={COLOR.WHITE} />
          <H1>WOOWA SHOP</H1>
        </Flex>
      </Link>
      <nav>
        <NavigationItem to="/cart">장바구니</NavigationItem>
        <NavigationItem to="/order-list">주문목록</NavigationItem>
      </nav>
    </Inner>
  </Container>
);

export default Header;
