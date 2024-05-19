import * as S from './styled';

interface CheckboxProps {
  id: number;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({ id, isChecked, onChange }: CheckboxProps) => {
  return (
    <S.Checkbox htmlFor={`${id}`}>
      <S.Input
        type="checkbox"
        id={`${id}`}
        checked={isChecked}
        onChange={onChange}
        name="checkbox"
      />
    </S.Checkbox>
  );
};

export default Checkbox;
