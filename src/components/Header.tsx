import { css } from '@emotion/react';

interface HeaderProps {
  buttonStyle: ReturnType<typeof css>;
  title: string;
  onClick: () => void;
}

export default function Header({ buttonStyle, onClick, title }: HeaderProps) {
  return (
    <header css={headerContainer}>
      <button css={buttonStyle} onClick={onClick}>
        {title}
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
