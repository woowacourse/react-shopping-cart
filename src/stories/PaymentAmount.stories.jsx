import React from "react";
import PaymentAmount from "components/pages/ProductCartPage/PaymentAmount";

export default {
  title: "Component/PaymentAmount",
  component: PaymentAmount,
  argTypes: {
    totalPrice: { controls: "number" },
    totalCount: { controls: "number" },
  },
};

const Template = (args) => <PaymentAmount {...args} />;

export const Default = Template.bind({});

Default.args = { totalPrice: 11200, totalCount: 4 };
