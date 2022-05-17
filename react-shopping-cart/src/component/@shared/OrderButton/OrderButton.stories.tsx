import OrderButton from "component/@shared/OrderButton/OrderButton";
import { Meta, Story } from "@storybook/react";

export default {
  title: "OrderButton",
  component: OrderButton,
} as Meta;

const Template: Story = () => <OrderButton>주문하기(2개)</OrderButton>;

export const DefaultOrderButton = Template.bind({});

DefaultOrderButton.args = {};
