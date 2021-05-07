import { VFC } from 'react';
import { CheckboxLabel } from './style';

interface Props {
  className?: string;
  description?: string;
}

const Checkbox: VFC<Props> = ({ className, description }) => {
  return (
    <CheckboxLabel className={className}>
      <input type="checkbox" />
      <span>{description}</span>
    </CheckboxLabel>
  );
};

export default Checkbox;
