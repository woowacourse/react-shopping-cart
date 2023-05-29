import type { Meta, StoryObj } from "@storybook/react";
import ShoppingInfo from "./ShoppingInfo";

const meta: Meta<typeof ShoppingInfo> = {
  title: "ShoppingCard",
  component: ShoppingInfo,
};

export default meta;

type Story = StoryObj<typeof ShoppingInfo>;

export const Default: Story = {
  args: {
    cartId: 1,
  },
};
