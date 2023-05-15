import { InputHTMLAttributes } from 'react';

import { StyledInput } from '@commons/Input/Input.styled';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { width, height, type, value, inputMode, alt, size, onChange } = props;

  return (
    <StyledInput
      width={width}
      height={height}
      type={type}
      value={value}
      inputMode={inputMode}
      alt={alt}
      size={size}
      onChange={onChange}
    />
  );
};

export default Input;
