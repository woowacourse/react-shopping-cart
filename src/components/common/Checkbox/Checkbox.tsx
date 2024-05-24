import * as S from './styled';

interface CheckboxProps {
  id: number | string;
  disabled?: boolean;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({ id, isChecked, disabled, onChange }: CheckboxProps) => {
  return (
    <S.Checkbox htmlFor={`${id}`}>
      <S.Input
        type="checkbox"
        id={`${id}`}
        disabled={disabled ?? false}
        checked={isChecked}
        onChange={onChange}
        name="checkbox"
      />
    </S.Checkbox>
  );
};

export default Checkbox;
