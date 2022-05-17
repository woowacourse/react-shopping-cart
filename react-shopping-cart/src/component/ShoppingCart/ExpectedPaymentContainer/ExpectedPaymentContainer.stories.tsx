import ExpectedPaymentContainer from "component/ShoppingCart/ExpectedPaymentContainer/ExpectedPaymentContainer";
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

export const DefaultExpectedPaymentContainer: Story = () => (
  <ExpectedPaymentContainer />
);
