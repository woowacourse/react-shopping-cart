import { styled } from 'styled-components';

const CheckboxElement = styled.input.attrs({ type: 'checkbox' })`
  width: 28px;
  height: 28px;

  accent-color: #333333;
`;

type CheckboxProps = {
  checked: boolean;
  onChange?: (value: boolean) => void;
};

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange } = props;

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.checked);
  };

  return <CheckboxElement checked={checked} onChange={handleCheckboxChange} />;
};

export default Checkbox;
