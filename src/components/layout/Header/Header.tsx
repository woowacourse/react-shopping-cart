import React from "react";
import { S } from "./Header.style";

const Header = ({ children }: React.PropsWithChildren) => {
  return <S.Header>{children}</S.Header>;
};

export default Header;
