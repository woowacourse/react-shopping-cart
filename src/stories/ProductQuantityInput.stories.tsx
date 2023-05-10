import type { Meta, StoryObj } from "@storybook/react";
import ProductQuantityInput from "../components/ProductQuantityInput/ProductQuantityInput";

const meta = {
  title: "ProductQuantityInput",
  component: ProductQuantityInput,
} satisfies Meta<typeof ProductQuantityInput>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export default meta;
