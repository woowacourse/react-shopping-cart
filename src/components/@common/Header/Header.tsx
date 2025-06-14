import { PropsWithChildren } from 'react';

import { HeaderStyle } from './Header.styles';

function Header({ children }: PropsWithChildren) {
  return <section css={HeaderStyle}>{children}</section>;
}

export default Header;
