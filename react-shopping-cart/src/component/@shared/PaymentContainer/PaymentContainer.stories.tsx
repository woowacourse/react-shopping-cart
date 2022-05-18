import ExpectedPaymentContainer from "component/@shared/PaymentContainer/PaymentContainer";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ExpectedPaymentContainer",
  component: ExpectedPaymentContainer,
  decorators: [
    (Story: Story) => (
      <div style={{ width: "298px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const CartExpectedPaymentContainer: Story = () => (
  <ExpectedPaymentContainer
    totalPaymentCost={32000}
    label="결제예상금액"
    buttonText="주문하기(2개)"
  />
);

export const OrderExpectedPaymentContainer: Story = () => (
  <ExpectedPaymentContainer
    totalPaymentCost={326000}
    label="총 결제금액"
    buttonText="326000원 결제하기"
  />
);
