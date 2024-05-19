import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";

import type { Meta, StoryObj } from "@storybook/react";
import CheckoutSummary from "../components/CartList/CheckoutSummary";
import { SHIPPING_FEE } from "../constants";

const meta: Meta<typeof CheckoutSummary> = {
  title: "ShoppingCart/CheckoutSummary",
  component: CheckoutSummary,
  parameters: {
    docs: {
      description: {
        component: "결제 요약 컴포넌트입니다.",
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    totalPrice: {
      description: "상품의 총 금액입니다.",
    },
    shippingFee: {
      description: "배송비입니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  args: {
    totalPrice: 10000,
    shippingFee: SHIPPING_FEE,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
