import ShoppingCartOrder from ".";

export default {
  title: "Presentational",
  component: ShoppingCartOrder,
};

const Template = (args) => <ShoppingCartOrder {...args} />;
export const PaymentAmountTemplate = Template.bind({});
PaymentAmountTemplate.args = {};
