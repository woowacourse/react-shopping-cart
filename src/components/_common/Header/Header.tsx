import React from "react";

import Styled from "./Header.style";

const Header = ({ children }: React.PropsWithChildren) => {
  return <Styled.Header>{children}</Styled.Header>;
};

export default Header;
