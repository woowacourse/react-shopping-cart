import { BoxSize } from '@Types/index';

import { BOX_SIZE } from '@Constants/index';

import * as S from './style';

type CheckboxProps = {
  isChecked: boolean;
  size?: BoxSize;
};

function Checkbox({ isChecked, size = 'medium' }: CheckboxProps) {
  console.log(BOX_SIZE[size]);
  return (
    <S.Checkbox isChecked={isChecked} aria-label="선택 버튼" size={BOX_SIZE[size]}>
      ✓
    </S.Checkbox>
  );
}

export default Checkbox;
