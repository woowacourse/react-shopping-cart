import ExpectedPaymentBox from "component/ShoppingCart/ExpectedPaymentBox/ExpectedPaymentBox";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ExpectedPaymentBox",
  component: ExpectedPaymentBox,
  decorators: [
    (Story: Story) => (
      <div style={{ width: "298px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const DefaultExpectedPaymentBox: Story<{ price: number }> = (args) => (
  <ExpectedPaymentBox {...args}>결제 예상 금액</ExpectedPaymentBox>
);

DefaultExpectedPaymentBox.args = {
  price: 21200,
};
