import React from 'react';
import Icon from '../Icon/Icon';
import * as Styled from './CheckBox.style';

function CheckBox({ checked = false, onClick = () => {} }) {
  return (
    <Styled.Container>
      <Styled.CustomCheckBox checked={checked} onClick={onClick}>
        {checked && <Icon iconName="checkBox" size="15px" stroke="white" />}
      </Styled.CustomCheckBox>
    </Styled.Container>
  );
}

export default CheckBox;
