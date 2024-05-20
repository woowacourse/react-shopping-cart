import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

interface HeaderProps {
  buttonStyle: ReturnType<typeof css>;
  onClick: () => void;
}

export default function Header({ buttonStyle, onClick, children }: PropsWithChildren<HeaderProps>) {
  return (
    <header css={headerContainer}>
      <button css={buttonStyle} onClick={onClick}>
        {children}
      </button>
    </header>
  );
}

const headerContainer = css`
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #000;
`;
