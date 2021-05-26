import { Input, Label } from './CheckBox.styles';

interface CheckBoxProps {
  id: string;
  size?: string;
  isChecked?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBox = ({
  id,
  size = '28px',
  onClick,
  onChange = () => {},
  isChecked = false,
}: CheckBoxProps) => (
  <>
    <Input
      id={id}
      type="checkbox"
      onClick={onClick}
      onChange={onChange}
      checked={isChecked}
    />
    <Label htmlFor={id} size={size} />
  </>
);

export default CheckBox;
export type { CheckBoxProps };
