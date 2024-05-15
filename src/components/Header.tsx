import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return <header css={headerContainer}>{children}</header>;
}

const headerContainer = css`
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #000;
`;
