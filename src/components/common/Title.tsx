import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function Title({ children }: PropsWithChildren) {
  return <h1 css={title}>{children}</h1>;
}

const title = css`
  height: 35px;

  font-size: 24px;
  font-weight: 700;
  line-height: 35px;
`;
