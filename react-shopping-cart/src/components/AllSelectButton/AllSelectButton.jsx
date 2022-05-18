import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from 'components/@shared/CheckBox/CheckBox';

import { allToggleIsChecked } from 'redux/carts/carts.action';

import { RowFlexWrapper } from 'styles/Wrapper';

function AllSelectButton() {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChangeCheckBox = () => {
    setChecked((prev) => !prev);
    dispatch(allToggleIsChecked());
  };

  return (
    <RowFlexWrapper gap="10px">
      {/* TODO: type checkbox를 기본적으로 넣어주기 */}
      <CheckBox type="checkbox" onChange={handleChangeCheckBox} />
      <div>{checked ? '전체선택' : '선택해제'}</div>
    </RowFlexWrapper>
  );
}

export default AllSelectButton;
