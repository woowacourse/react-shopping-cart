import React from "react";
import IconButton from "../components/common/IconButton";

import shoppingCartIconBlack from "../asset/shopping-cart-icon-black.svg";

export default {
  title: "Component/IconButton",
  component: IconButton,
  argTypes: {},
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: "Sample Button",
  onClick: () => {
    alert("장바구니에 담아요!");
  },
  iconImgSrc: shoppingCartIconBlack,
  iconImgAlt: "장바구니 담기",
};
