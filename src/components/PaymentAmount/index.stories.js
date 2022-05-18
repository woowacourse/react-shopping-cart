import PaymentAmount from ".";

export default {
  title: "Presentational",
  component: PaymentAmount,
};

const Template = (args) => <PaymentAmount {...args} />;
export const PaymentAmountTemplate = Template.bind({});
PaymentAmountTemplate.args = {};
