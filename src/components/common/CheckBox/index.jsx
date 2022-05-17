import React, {useState} from 'react';

import {StyledCheckbox} from 'components/common/CheckBox/style';

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
    console.log(isChecked);
  };

  return <StyledCheckbox type="checkbox" onChange={handleCheckbox} />;
}

export default CheckBox;
