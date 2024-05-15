import React from 'react';
import styled from 'styled-components';
import { CheckedBox, NoneCheckedBox } from '../../asset';

const CheckBoxImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

interface CheckBoxProps {
  isChecked: boolean;
  onClick: (e: React.MouseEvent) => void;
}
function CheckBox({ isChecked, onClick }: CheckBoxProps) {
  return (
    <CheckBoxImg
      src={isChecked ? CheckedBox : NoneCheckedBox}
      onClick={onClick}
    />
  );
}

export default CheckBox;
