import * as S from './style';

type CheckboxProps = {
  isChecked: boolean;
};

function Checkbox({ isChecked }: CheckboxProps) {
  return (
    <S.Checkbox isChecked={isChecked} aria-label="선택 버튼">
      ✓
    </S.Checkbox>
  );
}

export default Checkbox;
