import OrderLeftSection from "./OrderLeftSection";
import { Meta, Story } from "@storybook/react";

export default {
  title: "OrderLeftSection",
  component: OrderLeftSection,
} as Meta;

const Template: Story = () => <OrderLeftSection />;

export const DefaultOrderLeftSection = Template.bind({});
