import { useState } from "react";
import { useDispatch } from "react-redux";

import CheckBox from "component/@shared/CheckBox/CheckBox";

import { allToggleIsChecked } from "redux/carts/carts.action";
import { RowFlexWrapper } from "styles/Wrapper";

function AllSelectButton() {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleCheckBoxChange = () => {
    setChecked((prev) => !prev);
    dispatch(allToggleIsChecked());
  };

  return (
    <RowFlexWrapper gap="10px">
      <CheckBox onChange={handleCheckBoxChange} />
      <div>{checked ? "전체선택" : "선택해제"}</div>
    </RowFlexWrapper>
  );
}

export default AllSelectButton;
