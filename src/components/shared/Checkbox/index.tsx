import { InputHTMLAttributes, VFC } from 'react';
import { CheckboxLabel } from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  description: string;
  labelTextHidden?: boolean;
}

const Checkbox: VFC<Props> = ({ labelTextHidden, className, description, checked, onChange }) => {
  return (
    <CheckboxLabel className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span hidden={labelTextHidden}>{description}</span>
    </CheckboxLabel>
  );
};

export default Checkbox;
