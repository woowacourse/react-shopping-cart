import React, { useState } from "react";
import CheckBox from "components/common/CheckBox";

export default {
  title: "Component/Common/CheckBox",
  component: CheckBox,
};

const Template = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CheckBox
      isChecked={isChecked}
      handleChangeCheckbox={handleChangeCheckbox}
    />
  );
};

export const Default = Template.bind({});
