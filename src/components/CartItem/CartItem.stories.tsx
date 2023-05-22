import type { Meta, StoryObj } from "@storybook/react";
import CartItem from "./CartItem";
import Providers from "../../stories/Providers";

const meta = {
  component: CartItem,
  title: "CartItem",
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof CartItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    cart: {
      id: 1,
      quantity: 2,
      checked: true,
      product: {
        id: 1,
        name: "귀여운 고양이",
        price: 10000,
        imageUrl: "https://placekitten.com/200/200",
      },
    },
  },
} satisfies Story;
