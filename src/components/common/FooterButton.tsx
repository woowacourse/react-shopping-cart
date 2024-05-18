import { css } from '@emotion/react';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled: boolean;
  id: string;
}

export default function FooterButton({
  isDisabled,
  id,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <footer css={footer}>
      <label css={screenReaderOnly} htmlFor={id}>
        {id}
      </label>
      <button id={id} css={button(isDisabled)} onClick={onClick} disabled={isDisabled}>
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

const screenReaderOnly = css`
  position: absolute;
  overflow: hidden;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;
