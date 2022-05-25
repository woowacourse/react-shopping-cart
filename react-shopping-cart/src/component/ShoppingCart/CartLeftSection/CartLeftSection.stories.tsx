import CartLeftSection from "component/ShoppingCart/CartLeftSection/CartLeftSection";
import { Meta, Story } from "@storybook/react";

export default {
  title: "CartLeftSection",
  component: CartLeftSection,
  decorators: [
    (Story: Story) => (
      <div style={{ width: "490px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const DefaultCartLeftSection = () => <CartLeftSection />;
