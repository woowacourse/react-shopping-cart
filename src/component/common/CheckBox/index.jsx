import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/CheckBox/style';

function CheckBox() {
  return (
    <S.CheckBoxLayout id="check">
      <input type="checkbox" id="check" />
      <label htmlFor="check" />
    </S.CheckBoxLayout>
  );
}

CheckBox.propTypes = {
  id: PropTypes.string,
};

export default CheckBox;
