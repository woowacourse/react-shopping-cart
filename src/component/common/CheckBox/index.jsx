import React, {useState} from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/CheckBox/style';

export default function CheckBox({
  productId,
  handleCheckedTrue = () => void 0,
  handleCheckedFalse = () => void 0,
}) {
  const [checked, setChecked] = useState(false);
  return (
    <S.CheckBoxLayout
      productId={productId}
      checked={checked}
      onClick={() => {
        setChecked((prev) => !prev);
        checked ? handleCheckedTrue() : handleCheckedFalse();
      }}
    ></S.CheckBoxLayout>
  );
}

CheckBox.propTypes = {
  productId: PropTypes.number,
  handleCheckedTrue: PropTypes.func,
  handleCheckedFalse: PropTypes.func,
};
