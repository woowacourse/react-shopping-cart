import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function Description({ children }: PropsWithChildren) {
  return <p css={description}>{children}</p>;
}

const description = css`
  height: 15px;

  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
  line-height: 15px;
`;
