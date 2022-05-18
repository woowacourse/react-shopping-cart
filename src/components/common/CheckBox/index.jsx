import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {StyledCheckbox} from 'components/common/CheckBox/style';

function CheckBox({checked}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
    console.log(isChecked);
  };

  return <StyledCheckbox type="checkbox" onChange={handleCheckbox} checked={isChecked} />;
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropTypes.bool,
};
