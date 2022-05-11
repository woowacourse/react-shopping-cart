import ExpectedPaymentTopContainer from "./ExpectedPaymentTopContainer";

export default {
  title: "ExpectedPaymentTopContainer",
  component: ExpectedPaymentTopContainer,
  decorators: [
    (Story) => (
      <div style={{ width: "298px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DefaultExpecedPaymentTopContainer = (args) => (
  <ExpectedPaymentTopContainer {...args}>
    결제예상금액
  </ExpectedPaymentTopContainer>
);

DefaultExpecedPaymentTopContainer.args = {};
