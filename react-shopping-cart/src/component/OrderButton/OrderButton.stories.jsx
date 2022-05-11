import OrderButton from "./OrderButton";

export default {
  title: "OrderButton",
  component: OrderButton,
};

const Template = (args) => <OrderButton {...args}>주문하기(2개)</OrderButton>;

export const DefaultOrderButton = Template.bind({});

DefaultOrderButton.args = {};
