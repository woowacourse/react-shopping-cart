import { css } from '@emotion/react';
import { ReactNode } from 'react';

export default function Header({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <header css={headerCss}>
      {left}
      {right}
    </header>
  );
}

const headerCss = css({
  position: 'sticky',
  top: 0,
  height: '64px',
  width: '430px',
  backgroundColor: 'black',
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});
