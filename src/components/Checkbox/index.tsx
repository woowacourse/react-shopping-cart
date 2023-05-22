import { BoxSize } from '@Types/index';

import { BOX_SIZE } from '@Constants/index';

import * as S from './style';

type CheckboxProps = {
  isChecked?: boolean;
  size?: BoxSize;
  updateSelectedState: () => void;
};

function Checkbox({ isChecked = true, size = 'medium', updateSelectedState }: CheckboxProps) {
  return (
    <S.Checkbox isChecked={isChecked} aria-label="선택 버튼" size={BOX_SIZE[size]} onClick={updateSelectedState}>
      <S.Check>✓</S.Check>
    </S.Checkbox>
  );
}

export default Checkbox;
