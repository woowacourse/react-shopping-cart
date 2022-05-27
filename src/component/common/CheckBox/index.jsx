import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/CheckBox/style';

export default function CheckBox({
  initialChecked = false,
  productId = 0,
  handleCheckedTrue = () => void 0,
  handleCheckedFalse = () => void 0,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleClicked = (checked, productId) => {
    checked ? handleCheckedFalse(productId) : handleCheckedTrue(productId);
    setIsChecked((prev) => !prev);
  };

  return (
    <S.CheckBoxLayout
      productId={productId}
      checked={isChecked}
      onClick={() => handleClicked(isChecked, productId)}
    ></S.CheckBoxLayout>
  );
}

CheckBox.propTypes = {
  initialChecked: PropTypes.bool,
  productId: PropTypes.number,
  handleCheckedTrue: PropTypes.func,
  handleCheckedFalse: PropTypes.func,
};
