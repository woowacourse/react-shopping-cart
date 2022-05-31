import { ChangeEvent } from 'react';
import * as Styled from './Input.style';
type InputProps = {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  labelText: string;
};

function Input({
  id,
  type = 'text',
  placeholder = '',
  required = true,
  value,
  onChange,
  description,
  labelText,
}: InputProps) {
  return (
    <Styled.InputWrapper>
      <label htmlFor={id}>{labelText}</label>

      {description && <p>{description}</p>}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </Styled.InputWrapper>
  );
}

export default Input;
