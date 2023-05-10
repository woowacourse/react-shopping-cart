import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/Header/Header";

/**
 * `Hello, World` 를 출력
 */
const meta = {
  title: "Header",
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export default meta;
