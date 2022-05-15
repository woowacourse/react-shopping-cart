import React from 'react';
import PropTypes from 'prop-types';

import {CheckBoxWrapper} from 'component/common/CheckBox/style';

function CheckBox() {
  return (
    <CheckBoxWrapper id="check">
      <input type="checkbox" id="check" />
      <label htmlFor="check" />
    </CheckBoxWrapper>
  );
}
CheckBox.propTypes = {
  id: PropTypes.string,
};

export default CheckBox;
