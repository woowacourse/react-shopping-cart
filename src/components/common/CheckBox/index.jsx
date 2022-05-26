import React from 'react';
import PropTypes from 'prop-types';

import {StyledCheckbox} from 'components/common/CheckBox/style';

function CheckBox({checked = true, onChange}) {
  return <StyledCheckbox type="checkbox" onChange={onChange} checked={checked} />;
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
