import React, { VFC } from "react";
import { Link } from "react-router-dom";

import { CartIcon } from "../..";
import { COLOR, SIZE } from "../../../constants/theme";
import { Container, Inner, Flex, H1, NavigationItem } from "./style";

interface HeaderProps {
  navigation: { path: string; name: string }[];
}

const Header: VFC<HeaderProps> = ({ navigation }) => (
  <Container>
    <Inner>
      <Link to="/">
        <Flex>
          <CartIcon size={SIZE.ICON.CART.LG} color={COLOR.WHITE} />
          <H1>WOOWA SHOP</H1>
        </Flex>
      </Link>
      {navigation && (
        <nav>
          {navigation.map(({ path, name }) => (
            <NavigationItem key={path} to={path}>
              {name}
            </NavigationItem>
          ))}
        </nav>
      )}
    </Inner>
  </Container>
);

export default Header;
export { HeaderProps };
