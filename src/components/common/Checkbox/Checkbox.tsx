import * as S from './styled';

interface CheckboxProps {
  id: number | string;
  disabled?: boolean;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({ id, isChecked, disabled = false, onChange }: CheckboxProps) => {
  return (
    <S.Checkbox htmlFor={`${id}`}>
      <S.Input
        type="checkbox"
        id={`${id}`}
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        name="checkbox"
      />
    </S.Checkbox>
  );
};

export default Checkbox;
