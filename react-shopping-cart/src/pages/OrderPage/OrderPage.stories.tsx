import OrderPage from "./OrderPage";
import { Meta, Story } from "@storybook/react";

export default {
  title: "OrderPage",
  component: OrderPage,
} as Meta;

const Template: Story = () => <OrderPage />;

export const DefaultOrderPage = Template.bind({});
