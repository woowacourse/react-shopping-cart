import PaymentBox from "component/@shared/PaymentBox/PaymentBox";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ExpectedPaymentBox",
  component: PaymentBox,
  decorators: [
    (Story: Story) => (
      <div style={{ width: "298px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const DefaultExpectedPaymentBox: Story<{ price: number }> = (args) => (
  <PaymentBox {...args}>결제 예상 금액</PaymentBox>
);

DefaultExpectedPaymentBox.args = {
  price: 21200,
};
