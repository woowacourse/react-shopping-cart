import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import { checkIcon, labelTag, labelText, screenReaderOnly } from './Checkbox.styled';

import { CHECKED, UNCHECKED } from '@assets/images';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  htmlFor: string;
  label: string;
  labelCSS?: ReturnType<typeof css>;
  isDisabled?: boolean;
}

const Checkbox = ({ checked, onChange, htmlFor, label, labelCSS, isDisabled }: CheckboxProps) => {
  return (
    <>
      <input
        id={htmlFor}
        type="checkbox"
        checked={checked}
        css={screenReaderOnly}
        onChange={onChange}
        disabled={isDisabled}
      />
      <label css={labelTag} htmlFor={htmlFor}>
        <img src={checked ? CHECKED : UNCHECKED} css={checkIcon} />
        <span css={labelCSS || labelText}>{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
