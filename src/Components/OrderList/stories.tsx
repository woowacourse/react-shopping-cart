import React from "react";
import { Story, Meta } from "@storybook/react";

import OrderList, { OrderListProps } from ".";
import OrderProductItem from "../OrderProductItem";
import { Button, ProductImage } from "..";
import { COLOR } from "../../constants/theme";
import { toNumberWithComma } from "../../utils/format";

export default {
  title: "OrderList",
  component: OrderList,
} as Meta;

const Template: Story<OrderListProps> = (args) => <OrderList {...args} />;

const children = [...Array(4)].map((_, index) => (
  <OrderProductItem
    key={index}
    imageSrc="http://via.placeholder.com/282x282"
    Button={
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
    }
    name="브랜브랜 철봉"
    price={10000000}
    quantity={5}
    id="1"
  />
));

export const Basic = Template.bind({});
Basic.args = {
  id: "1",
  isVisibleShowDetailLink: false,
  children,
};

export const WithDetailButton = Template.bind({});
WithDetailButton.args = {
  id: "1",
  isVisibleShowDetailLink: true,
  children,
};
