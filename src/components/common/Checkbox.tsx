import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import { CHECKED, UNCHECKED } from '@assets/images';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  htmlFor: string;
  label: string;
}

const Checkbox = ({ checked, onChange, htmlFor, label }: CheckboxProps) => {
  return (
    <>
      <input
        id={htmlFor}
        type="checkbox"
        checked={checked}
        css={screenReaderOnly}
        onChange={onChange}
      />
      <label css={labelTag} htmlFor={htmlFor}>
        <img src={checked ? CHECKED : UNCHECKED} css={checkIcon} />
        <span css={labelText}>{label}</span>
      </label>
    </>
  );
};

export default Checkbox;

const screenReaderOnly = css`
  position: absolute;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  overflow: hidden;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

const labelTag = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;

const checkIcon = css`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
