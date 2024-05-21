import { css } from '@emotion/react';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled: boolean;
}

export default function FooterButton({
  isDisabled,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <footer css={footer}>
      <button css={button(isDisabled)} onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    </footer>
  );
}

const footer = css`
  width: 100%;
  height: 64px;
`;

const button = (isDisabled: boolean) => css`
  width: 100%;
  height: 100%;

  background-color: ${isDisabled ? '#BEBEBE' : '#000'};

  font-size: 16px;
  font-weight: 700;
  color: #fff;

  &:hover {
    opacity: ${isDisabled ? 1 : 0.8};
  }

  cursor: ${isDisabled ? 'default' : 'pointer'};
`;
