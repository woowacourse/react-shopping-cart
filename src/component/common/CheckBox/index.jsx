import {CheckBoxWrapper} from 'component/common/CheckBox/style';
import React from 'react';

function CheckBox() {
  return (
    <CheckBoxWrapper>
      <input type="checkbox" id="check" />
      <label htmlFor="check"></label>
    </CheckBoxWrapper>
  );
}

export default CheckBox;
