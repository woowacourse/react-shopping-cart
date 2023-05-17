import * as S from './style';

type CheckboxProps = {
  isChecked: boolean;
  size: keyof typeof BOX_SIZE;
};

export const BOX_SIZE = {
  small: '24px',
  medium: '30px',
  larger: '36px',
} as const;

function Checkbox({ isChecked, size = 'medium' }: CheckboxProps) {
  console.log(BOX_SIZE[size]);
  return (
    <S.Checkbox isChecked={isChecked} aria-label="선택 버튼" size={BOX_SIZE[size]}>
      ✓
    </S.Checkbox>
  );
}

export default Checkbox;
