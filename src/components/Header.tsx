import { css } from '@emotion/react';
import { ReactNode } from 'react';

export default function Header({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <header css={headerCss}>
      {left}
      {right}
    </header>
  );
}

const headerCss = css({
  position: 'fixed',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  height: '64px',
  width: '382px',
  backgroundColor: 'black',
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 100
});
