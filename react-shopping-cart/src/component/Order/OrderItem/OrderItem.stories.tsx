import OrderItem from "./OrderItem";
import { Meta, Story } from "@storybook/react";
import { CartItem } from "type";

export default {
  title: "OrderItem",
  component: OrderItem,
} as Meta;

const Template: Story<Pick<CartItem, "name" | "thumbnail" | "quantity">> = (
  args
) => <OrderItem {...args} />;

export const DefaultOrderItem = Template.bind({});
DefaultOrderItem.args = {
  name: "스토리북 상품",
  thumbnail:
    "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
  quantity: 1,
};
