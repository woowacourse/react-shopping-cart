import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from 'components/@shared/CheckBox/CheckBox';
import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import { allToggleIsChecked } from 'redux/carts/carts.action';

//재사용O
function AllSelectCheckbox() {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChangeCheckBox = () => {
    setChecked((prev) => !prev);
    dispatch(allToggleIsChecked());
  };

  return (
    <FlexWrapper gap="10px">
      <CheckBox onChange={handleChangeCheckBox} />
      <div>{checked ? '전체선택' : '선택해제'}</div>
    </FlexWrapper>
  );
}

export default AllSelectCheckbox;
