import styled from '@emotion/styled';
import { ImgHTMLAttributes } from 'react';

interface CheckBoxProps extends ImgHTMLAttributes<HTMLImageElement> {
  isChecked: boolean;
}

const CheckBox = ({ isChecked, ...rest }: CheckBoxProps) => {
  return isChecked ? (
    <S.CheckBox
      isChecked={isChecked}
      src="/checked-box.svg"
      alt="checkedBox"
      data-testid="checkBox"
      {...rest}
    />
  ) : (
    <S.CheckBox
      isChecked={isChecked}
      src="/unchecked-box.svg"
      alt="unCheckedBox"
      data-testid="checkBox"
      {...rest}
    />
  );
};

export default CheckBox;

const S = {
  CheckBox: styled.img<CheckBoxProps>`
    cursor: pointer;
    background-color: ${({ isChecked }) =>
      isChecked ? '#000000' : 'transparent'};
  `,
};
