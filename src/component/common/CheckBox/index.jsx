import React, {useState} from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/CheckBox/style';

export default function CheckBox({
  initialChecked = false,
  productId,
  handleCheckedTrue = () => void 0,
  handleCheckedFalse = () => void 0,
}) {
  const [checked, setChecked] = useState(initialChecked);
  return (
    <S.CheckBoxLayout
      productId={productId}
      checked={checked}
      onClick={() => {
        setChecked((prev) => {
          !prev ? handleCheckedTrue(productId) : handleCheckedFalse(productId);
          return !prev;
        });
      }}
    ></S.CheckBoxLayout>
  );
}

CheckBox.propTypes = {
  initialChecked: PropTypes.bool,
  productId: PropTypes.number,
  handleCheckedTrue: PropTypes.func,
  handleCheckedFalse: PropTypes.func,
};
