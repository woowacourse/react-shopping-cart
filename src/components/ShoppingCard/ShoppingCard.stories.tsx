import type { Meta, StoryObj } from "@storybook/react";
import ShoppingCard from "./ShoppingCard";

const meta: Meta<typeof ShoppingCard> = {
  title: "ShoppingCard",
  component: ShoppingCard,
};

export default meta;

type Story = StoryObj<typeof ShoppingCard>;

export const Default: Story = {
  args: {
    cartId: 1,
  },
};
