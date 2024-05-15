import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return <header css={headerContainer}>{children}</header>;
}

const headerContainer = css`
  height: 64px;
  background-color: #000;
`;
