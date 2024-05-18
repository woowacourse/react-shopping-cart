import { Interpolation, Theme, css } from '@emotion/react';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  css: Interpolation<Theme>;
}

export default function Button({ id, children, css, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <>
      <label css={screenReaderOnly} id={id}>
        {id}
      </label>
      <button css={css} {...props}>
        {children}
      </button>
    </>
  );
}

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
