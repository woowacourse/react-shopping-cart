import React, { useState } from "react";
import ProductCartItem from "components/pages/ProductCartPage/ProductCartItem";

export default {
  title: "Component/ProductCartItem",
  component: ProductCartItem,
  argTypes: {
    product: { controls: "object" },
  },
};

const Template = (args) => {
  const [checkList, setCheckList] = useState([]);
  const handleClickIncreaseButton = (id) => () => {};

  const handleClickDecreaseButton = (id, count) => () => {};

  const handleClickDeleteItemButton = (id) => () => {};

  const handleChangeCheckbox = (id) => () => {
    if (checkList.includes(id)) {
      setCheckList((prev) => prev.filter((cartItemId) => cartItemId !== id));
      return;
    }
    setCheckList((prev) => [...prev, id]);
  };

  return (
    <ProductCartItem
      {...args}
      checkList={checkList}
      handleClickIncreaseButton={handleClickIncreaseButton}
      handleClickDecreaseButton={handleClickDecreaseButton}
      handleClickDeleteItemButton={handleClickDeleteItemButton}
      handleChangeCheckbox={handleChangeCheckbox}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  product: {
    id: 1,
    thumbnailUrl: "https://cdn-mart.baemin.com/goods/85/1537405626217m0.jpg",
    name: "PET보틀-정사각(420ml)",
    price: 43400,
    count: 1,
  },
};
