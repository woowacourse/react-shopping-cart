import type { Meta, StoryObj } from "@storybook/react";
import Counter from "./Counter";

const meta: Meta<typeof Counter> = {
  title: "Counter",
  component: Counter,
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    theme: {
      alignSelf: "auto",
      width: "72px",
      height: "32px",
    },
  },
};
