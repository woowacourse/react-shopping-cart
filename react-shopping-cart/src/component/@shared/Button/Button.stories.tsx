import Button from "component/@shared/Button/Button";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story = () => <Button></Button>;

export const ShoppingCartButton = Template.bind({});
ShoppingCartButton.args = {
  children: "장바구니",
};
