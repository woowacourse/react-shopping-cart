import React from "react";
import { Story, Meta } from "@storybook/react";

import OrderProductItem, { OrderProductItemProps } from ".";
import { Button, ProductImage } from "..";
import { COLOR } from "../../constants/theme";

export default {
  title: "OrderProductItem",
  component: OrderProductItem,
} as Meta;

const Template: Story<OrderProductItemProps> = (args) => <OrderProductItem {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  imageSrc: "http://via.placeholder.com/282x282",
  imageSize: "141px",
  Button: (
    <Button
      style={{
        width: "8.625rem",
        height: "3rem",
        color: COLOR.WHITE,
        backgroundColor: COLOR.MAIN,
        fontSize: "1.25rem",
      }}
      onClick={() => {}}
    >
      장바구니
    </Button>
  ),
  name: "브랜브랜 철봉",
  price: 1000000,
  quantity: 5,
  id: "1",
};
