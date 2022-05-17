import NavigateButton from "component/@shared/NavigateButton/NavigateButton";
import { Meta, Story } from "@storybook/react";

export default {
  title: "NavigateButton",
  component: NavigateButton,
  decorators: [
    (Story: Story) => (
      <div
        style={{
          background: "black",
          width: "200px",
          height: "100px",
          textAlign: "center",
          lineHeight: "100px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = () => <NavigateButton to="/"></NavigateButton>;

export const ShoppingCartNavigateButton = Template.bind({});
ShoppingCartNavigateButton.args = {
  children: "장바구니",
};

export const OrderListNavigateButton = Template.bind({});
OrderListNavigateButton.args = {
  children: "주문목록",
};
