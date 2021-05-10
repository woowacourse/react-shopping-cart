import { InputHTMLAttributes, VFC } from 'react';
import { CheckboxLabel } from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
}

const Checkbox: VFC<Props> = ({ className, description, checked, onChange }) => {
  return (
    <CheckboxLabel className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{description}</span>
    </CheckboxLabel>
  );
};

export default Checkbox;
