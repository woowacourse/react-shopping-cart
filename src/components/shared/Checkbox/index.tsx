import { FC } from 'react';
import { CheckboxLabel } from './style';

interface Props {
  children: React.ReactNode;
}

const Checkbox: FC<Props> = ({ children }) => {
  return (
    <CheckboxLabel>
      <input type="checkbox" />

      {children}
    </CheckboxLabel>
  );
};

export default Checkbox;
