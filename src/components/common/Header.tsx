import { PropsWithChildren } from "react";

import * as Styled from "./Header.style";

function Header({ children }: PropsWithChildren) {
  return <Styled.Container>{children}</Styled.Container>;
}
export default Header;
