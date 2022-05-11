import { useState } from "react";
import { RowFlexWrapper } from "../../styles/Wrapper";
import CheckBox from "../@shared/CheckBox/CheckBox";

function AllSelectButton() {
  const [checked, setChecked] = useState(false);

  const handleChangeCheckBox = () => {
    setChecked((prev) => !prev);
  };

  return (
    <RowFlexWrapper gap="10px">
      <CheckBox type="checkbox" onChange={handleChangeCheckBox} />
      <div>{checked ? "전체선택" : "선택해제"}</div>
    </RowFlexWrapper>
  );
}

export default AllSelectButton;
