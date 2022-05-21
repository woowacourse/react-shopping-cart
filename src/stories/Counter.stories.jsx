import React, { useState } from "react";
import Counter from "components/common/Counter";

export default {
  title: "Component/Common/Counter",
  component: Counter,
};

const Template = () => {
  const [count, setCount] = useState(1);

  const handleClickIncreaseButton = () => {
    setCount((prev) => prev + 1);
  };

  const handleClickDecreaseButton = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  return (
    <Counter
      count={count}
      handleClickIncreaseButton={handleClickIncreaseButton}
      handleClickDecreaseButton={handleClickDecreaseButton}
    />
  );
};

export const Default = Template.bind({});
